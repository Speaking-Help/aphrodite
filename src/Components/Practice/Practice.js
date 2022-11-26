import { Button, Input, View, VStack } from "native-base";
import Recorder from "../BasicUtil/Recorder";
import React from "react";
import * as mime from 'react-native-mime-types';
import { StyleSheet } from "react-native";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import { TouchableOpacity } from "react-native";


/**
 * Core Screen of the app. Allows you to practice your English speaking with automatic verbal feedback.
 */
const Practice = () => {

  const [recording, setRecording] = React.useState();
  const [value, setValue] = React.useState("en");
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [loadingText, setLoadingText] = React.useState(false);
  const [mainText, setMainText] = React.useState("");


  /**
   * Uploads recorded voice clip to Flask API and receieves transcription
   */
  async function uploadAudioAsync(uri) {

    //format body
    let apiUrl = 'http://127.0.0.1:5000/upload';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    //customize fetch request
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    //actual fetch request and handling
    return fetch(apiUrl, options)
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        setTranscribedText(json);
        return json;
      });
  }


  /**
   * Performs transcription- gathers proper clip and uses 
   * uploadAudioAsync.
   */
  async function tts() {
    let length = recordings.length;
    let uri = await recordings[length - 1].file;
    console.log(mime.lookup(uri));
    await uploadAudioAsync(uri);
  }



  /**
   * Gets proper audio version of most recently fixed translation
   */
  async function playAudio() {

    let val = fetch('http://127.0.0.1:5000/toAudio', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //posts the fixed, transcribed text
        value: fixedText,
        language: value
      })
    })
      .catch(function (error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        throw error;
      });
    return;
  }



  /**
   * Performs Grammar Error Correction
   * Sends in most recently Transcribed text snippet to the
   * "grammarlyify" Flask method and updates the 'fixedText' variable
   */
  async function gec() {
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
    return;
  }

  /**
   * Handles change in text- updates most recent text value
   */
  const handleChange = text => setValue(text);


  return (

    <View height={"full"}>
      <VStack alignContent="center" justifyContent="center">
        <HStack>
          <Recorder setRecordings={setRecordings} />
          <TouchableOpacity alt="Speak" style={styles.buto} onPress={() => recordings[0].sound.replayAsync()}>
            <Image style={styles.im} source={require("./Speak.png")} />
          </TouchableOpacity>
        </HStack>
        <Button onPress={() => {
          tts();
        }}> Translate </Button>
        <Button onPress={() => {
          gec();
        }}>Fix It</Button>

        <Input value={value} onChangeText={handleChange} mx="3" placeholder="Input" w="80%" />
        <Button onPress={playAudio}>PLAY</Button>
        <Box rounded={'full'}>
          <Box>

          </Box>

        </Box>
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
    borderRadius: 20,
    padding: 0,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  im: {
    height: 150,
    width: 150
  }
});

export default Practice;