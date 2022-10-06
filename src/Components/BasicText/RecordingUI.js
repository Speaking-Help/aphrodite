import { Button, View, VStack } from "native-base";
import Recorder from "../Recorder/Recorder";
import React from "react";
import ResponsiveBox from "./ResponsiveBox";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";


const RecordingUI = () => {

    const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [loadingText, setLoadingText] = React.useState(false);
  const [transcribedText, setTranscribedText] = React.useState("transcribed text...");
  const [fixedText, setFixedText] = React.useState("")

  async function uploadAudioAsync(uri) {
    //console.log("Uploading " + uri);
    let apiUrl = 'http://127.0.0.1:5000/upload';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];



    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    //console.log("POSTing " + uri + " to " + apiUrl);

    return fetch(apiUrl, options)
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        setTranscribedText(json);
        return json;
      });
  }

  // Do a recording
  async function postStuff() {
    //console.log(recordings.length)
    let length = recordings.length;
    let uri = await recordings[length - 1].file;
    console.log(mime.lookup(uri));
    await uploadAudioAsync(uri);
  }

  async function fixup() {

    let val = fetch('http://127.0.0.1:5000/grammarlyify', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: transcribedText
      })
    })
    .then(res => res.text())
  .then(data => {
  setFixedText(data)});
    //.then((response) =>  {
      //console.log(typeof(reponse));
   // }
   // )
      //setTranscribedText(json);
      //return json;
    
    //console.log(((val.json())));

    //setFixedText(val);
    return;
  }

  const getStuff = () => {

    return fetch('http://127.0.0.1:5000/jojo', {
      method: 'GET'
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };


  function deleete() {
    setRecording(null);
    console.log
  }
    return (

        <View>
            <VStack alignContent="center">
                <ResponsiveBox response={true} />
                <ResponsiveBox response={false} text={transcribedText}/>
                <Recorder setRecordings={setRecordings}/>
                <Button onPress={() => (postStuff())} />
                <Text> {recordings.length}</Text>
            </VStack>
        </View>


    );
}

export default RecordingUI;