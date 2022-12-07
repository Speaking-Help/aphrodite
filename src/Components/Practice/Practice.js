import { Button, Input, View, VStack, Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, FlatList } from "native-base";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import * as mime from 'react-native-mime-types';
import { AntDesign } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import Svg, { Path } from "react-native-svg";
import { moderateScale } from "react-native-size-matters";

import Recorder from "../Recorder/Recorder";

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
  const [differences, setDifferences] = React.useState(null);
  const [isTranscribed, setIsTranscribed] = React.useState(true);

  const [fixedDisplay, setFixedDisplay] = React.useState();
  let x = 0;


  const fu = () => {
    let temporary = [];

    console.log("USING EFFECT");

    if (differences==null) {
      console.log(" DIFF be null");
      return;
    }
    if (differences.length == 0) {
      setFixedDisplay(fixedText);
      console.log("NO DIFF");
      return;
    }


    let start = differences[0]["start"]
    let end = differences[0]["end"]
    let currentIndex = 0

    console.log("START AT " + start);
    console.log("END AT " + end);


    for (let x = 0; x < fixedText.length; x++) {
      if (x > end && currentIndex < differences.length-1 && differences[currentIndex]!=null) {
        currentIndex += 1;
        console.log("WE AARE AT " +  currentIndex + " and " + x);
        start = differences[currentIndex]["start"]
        end = differences[currentIndex]["end"]
      }
      if (x <= end && x >= start) {
        console.log("UNDERLINED IS " + fixedText.charAt(x));
        temporary.push(<Text key={x} underline>{fixedText.charAt(x)}</Text>)
      }
      else {
        temporary.push(<Text key={x}>{fixedText.charAt(x)}</Text>)
      }
    }

    setFixedDisplay(temporary);

  };

  useEffect(() => {
    let temporary = [];

    console.log("USING EFFECT");

    if (differences==null) {
      console.log(" DIFF be null");
      return;
    }
    if (differences.length == 0) {
      setFixedDisplay(fixedText);
      console.log("NO DIFF");
      return;
    }


    let start = differences[0]["start"]
    let end = differences[0]["end"]
    let currentIndex = 0

    console.log("START AT " + start);
    console.log("END AT " + end);


    for (let x = 0; x < fixedText.length; x++) {
      if (x > end && currentIndex < differences.length-1) {
        currentIndex += 1;

        console.log("WE AARE AT " +  currentIndex + " and " + differences.length);
        console.log(differences)
        start = differences[currentIndex]["start"]
        end = differences[currentIndex]["end"]
      }
      if (x <= end && x >= start) {
        console.log("UNDERLINED IS " + fixedText.charAt(x));
        temporary.push(<Text underline>{fixedText.charAt(x)}</Text>)
      }
      else {
        temporary.push(<Text>{fixedText.charAt(x)}</Text>)
      }
    }

    setFixedDisplay(temporary);

  }, [fixedText, x])



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
      .then((response) => response.json())
      .then((further) => further.text)
      .then((json) => {
        console.log("RESPONSE IS " + json);
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
  async function tts(updatedRecordings) {
    console.log("TExT TO SPEECh " + updatedRecordings.length);
    let length = updatedRecordings.length;
    let uri = await updatedRecordings[length - 1].file;
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
   * Example audio testing function
  //  */
  // async function playAudio() {
  //   console.log("PLAY AUDIO")

  //   let val = fetch('http://127.0.0.1:5000/toAudio', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       //posts the fixed, transcribed text
  //       value: "I once ate five apples in a row- it was quite the fantastically heavenly experience.",
  //       language: 'en'
  //     })
  //   })
  //     .catch(function (error) {
  //       console.log('There has been a problem with your fetch operation: ' + error.message);
  //       throw error;
  //     });
  //   return;
  // }




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
      .then(res => res.json())
      .then(data => {
        console.log("DATA IS " + data.text);
        console.log("DIFFERENCES ARE " + data.diff.length)
        setDifferences(data.diff); 
        setActText(true);
        setFixedText(data.text);
        fu();
        x = x+1; 
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

        <TouchableOpacity onPress={playAudio}>
          <Box
            alignSelf={"center"}
            marginTop={"1/5"}
            backgroundColor={"amber.200"}
            height={"2/3"}
            width={"5/6"}
            rounded={"3xl"}
            shadow={"9"}
            padding={"5"}
          >

            <Text color={"gray.700"}>
              When you record your voice, it will appear here. Tap this box to hear the correction back.
            </Text>
            <Text paddingTop={"10"} bold fontSize={"xl"} color={"black"}>
              {actText ? fixedDisplay : <ActivityIndicator size="large" />}
            </Text>
          </Box>
        </TouchableOpacity>
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