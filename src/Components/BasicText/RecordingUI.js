import { Button, Input, View, VStack } from "native-base";
import Recorder from "../BasicUtil/Recorder";
import React from "react";
import ResponsiveBox from "./ResponsiveBox";
import * as mime from 'react-native-mime-types';
import { StyleSheet } from "react-native";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import { TouchableOpacity } from "react-native";

const RecordingUI = () => {

  const [recording, setRecording] = React.useState();
  const [lang, setLang] = React.useState("en");
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [loadingText, setLoadingText] = React.useState(false);
  const [transcribedText, setTranscribedText] = React.useState("I eat five chicken and eight cow yesterday.");
  const [fixedText, setFixedText] = React.useState("I ate five chickens and eight cows yesterday.")

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

  async function playAudio() {
    console.log("FIXING UP");
    let val = fetch('http://127.0.0.1:5000/toAudio', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: fixedText,
        lang: lang
      })
    });

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

  function handleThat(event) {
    setLang(event.target.value);
  }

  async function fixup() {
    console.log("FIXING UP");
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
        setFixedText(data)
      });
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
      <VStack alignContent="center" justifyContent="center">
        <ResponsiveBox response={true} text={transcribedText} />
        <ResponsiveBox response={false} text={fixedText} />
        <HStack>
          <Recorder setRecordings={setRecordings} />
          <TouchableOpacity alt="Speak" style={styles.buto} onPress={() => recordings[0].sound.replayAsync()}>
            <Image style={styles.im} source={require("./Speak.png")} />
          </TouchableOpacity>
        </HStack>
        <Button onPress={() => {
          postStuff();
        }}> Translate </Button>
        <Button onPress={() => {
          fixup();
        }}>Fix It</Button>

        <Input onChange={handleThat} mx="3" placeholder="Input" w="80%" />
        <Button onPress={playAudio}>PLAY</Button>
      </VStack>
    </View>
  );
}
const styles = StyleSheet.create({
  absoluteView: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  btn: {
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: {
    flex: 1,
    margin: 16
  },
  button: {
    margin: 16
  },
  buto: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    height: 175,
    width: 175
  },
  im: {
    height: 150,
    width: 150
  }
});

export default RecordingUI;