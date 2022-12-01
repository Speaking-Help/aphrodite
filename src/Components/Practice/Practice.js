import { Button, Input, View, VStack, Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";
import React from "react";
import * as mime from 'react-native-mime-types';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import Recorder from "../Recorder/Recorder";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import Svg from "react-native-svg";
import { Path } from "react-native-svg";

import { FlatList } from "native-base";
import { moderateScale } from "react-native-size-matters";

/**
 * Core Screen of the app. Allows you to practice your English speaking with automatic verbal feedback.
 */
const Practice = ({ navigation }) => {

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [transcribedText, setTranscribedText] = React.useState("");
  const [loadingText, setLoadingText] = React.useState(false);
  const [fixedText, setFixedText] = React.useState("");
  const [recentUri, setRecentUri] = React.useState();
  const [actText, setActText] = React.useState(true);
  const [isTranscribed, setIsTranscribed] = React.useState(true);



  /**
   * Uploads recorded voice clip to Flask API and receieves transcription
   */
  async function uploadAudioAsync(uri) {
    setRecentUri(uri);

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

  async function playSound() {
    let length = recordings.length;
    console.log("LENGTH IS " + (length));
    recordings[length - 1].sound.replayAsync()
  }


  /**
   * Performs transcription- gathers proper clip and uses 
   * uploadAudioAsync.
   */
  async function tts() {
    console.log("TExT TO SPEECh " + recordings.length);
    let length = recordings.length;
    let uri = await recordings[length - 1].file;
    console.log(mime.lookup(uri));
    await uploadAudioAsync(uri)
      .then(() => {
        gec();
        setIsTranscribed(true);
      }
      );

  }



  /**
   * Gets proper audio version of most recently fixed translation
   */
  async function playAudio() {
    console.log("PLAY AUDIO")

    let val = fetch('http://127.0.0.1:5000/toAudio', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        //posts the fixed, transcribed text
        value: fixedText,
        language: 'en'
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
    console.log("GEC\n");
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
        setActText(true);
      });
    return;
  }

  /**
   * Handles change in text- updates most recent text value
   */
  const handleChange = text => setValue(text);


  return (

    <View height={"full"}>
      <Box
        bg={{
          linearGradient: {
            colors: ['amber.400', 'amber.300'],
            start: [0, 0],
            end: [1, 0]
          }
        }}

        height={"full"}
      >
        <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
          <AntDesign name="left" size={30} color="black" style={{ marginLeft: 10, marginTop: 60 }} />
        </TouchableOpacity>

        <Box
          alignSelf={"center"}
          marginTop={"1/5"}
          backgroundColor={"amber.200"}
          height={"1/2"}
          width={"5/6"}
          rounded={"3xl"}
          shadow={"9"}
          padding={"5"}
        >

          <Text color={"gray.700"}>
            When you record your voice, it will appear here. Tap this box to hear the correction back.
          </Text>
          <Text bold fontSize={"xl"} paddingTop={"10"} color={"black"}>
            I <Text color={"red.500"}>ate</Text> five delicious burger<Text color={"red.500"}>s</Text> at the <Text color={"red.500"}>store</Text> with my three best friends.
          </Text>

        </Box>
        {/* <VStack alignContent="center" justifyContent="center">
          <TouchableOpacity onPress={playSound}>
            <Box

              marginX={"10px"}
              bg={{
                linearGradient: {
                  colors: ['black', 'red.100'],
                  start: [0, 0],
                  end: [1, 0]
                }
              }} p="12" rounded="xl" _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'warmGray.50',
                textAlign: 'center'
              }}>

              {isTranscribed ? transcribedText : <ActivityIndicator size="large" />}
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={playAudio}>
            <Box
              marginTop={"30px"}
              marginX={"10px"}
              bg={{
                linearGradient: {
                  colors: ['lime.900', 'violet.800'],
                  start: [0, 0],
                  end: [1, 0]
                }
              }} p="12" rounded="xl" _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'warmGray.50',
                textAlign: 'center'
              }}>


              {actText ? fixedText : <ActivityIndicator size="large" />}


            </Box>
          </TouchableOpacity>


          <HStack>

          </HStack>

        </VStack> */}

        <Box
          width={"full"}
          position={"absolute"}
          bottom={"10"}
          alignItems={"center"}
        >
          <Recorder
            loading1={setIsTranscribed}
            loading2={setActText}
            transcribe={tts}
            setRecordings={setRecordings}
            withTimer={false}
          />
        </Box>
      </Box>
      

    </View >
  );
}


export default Practice;