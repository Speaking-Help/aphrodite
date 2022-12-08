import { Button, Center, Container, Heading, ScrollView, Text, View, VStack, Box, Spacer } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path, Image } from "react-native-svg";
import { LexRuntimeV2, DeleteSessionCommand } from "@aws-sdk/client-lex-runtime-v2";
import AWS from 'aws-sdk';
import * as React from 'react';
import * as mime from 'react-native-mime-types';
import { useEffect } from "react";

import Recorder from "../Recorder/Recorder";
import Message from "./Message";
import ChatMessage from "./ChatMessage";
import { ActivityIndicator } from "react-native";

/**
 * Chatbot screen- interact with chatbot
 * TODO connect to chatbot
 */
const ChatScreen = ({ navigation }) => {

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [transcribedText, setTranscribedText] = React.useState("");
  const [loadingText, setLoadingText] = React.useState(false);
  const [fixedText, setFixedText] = React.useState("");
  const [recentUri, setRecentUri] = React.useState();
  const [actText, setActText] = React.useState(true);
  const [differences, setDifferences] = React.useState(null);
  const [isTranscribed, setIsTranscribed] = React.useState(true);
  const [visibleAI, setVisibleAI] = React.useState(false);
  const [AIResponse, setAIResponse] = React.useState(false);
  const [chats, setChats] = React.useState([]);
  const [render, setRender] = React.useState();
  const [prompt, setPrompt] = React.useState('You: How are you?\n Friend: I\'m good. How are you?\n You: I am good. Where do you like to go to for vacation?\nFriend: I like going to the Bahamas! How about you?\nYou:I think Spain is a beautiful place to visit this time of year.');


  const [fixedDisplay, setFixedDisplay] = React.useState();
  let x = 0;
  let transText = "";
  let fixedTemp = "";
  let realPrompt = 'You: How are you?\n Friend: I\'m good. How are you?\n You: I am good. Where do you like to go to for vacation?\nFriend: I like going to the Bahamas! How about you?\nYou:I think Spain is a beautiful place to visit this time of year.';


  /*const client = new LexRuntimeV2Client({
    credentials: AWS.Credentials(

    )
    region: "REGION"
  });*/

  const setActTextHandler = (value) => {
    setActText(value);

    // let jo = chats;
    // console.log("ADDING " + fixedDisplay);
    // jo.push([fixedDisplay, false]);
    // setChats(jo);

    console.log("CHATS IS " + chats);

  }

  const fu = () => {

    setFixedDisplay(fixedText);
    respond();

  };

  useEffect(() => {

    setFixedDisplay(fixedText);

  }, [fixedText, x])




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
        value: transText
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("DATA IS " + data.text);
        console.log("DIFFERENCES ARE " + data.diff.length)
        setDifferences(data.diff);
        setActText(true);
        let jo = chats;
        jo.push([data.text, false]);
        setChats(jo);
        console.log("CHATS IS " + chats);
        setFixedText(data.text);
        fixedTemp = data.text
        fu();
        x = x + 1;
      });
    return;
  }


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
        console.log("RESPONSE BE " + json);
        setTranscribedText(json);
        transText = json;
        return json;
      });
  }
  const respond = () => {
    console.log("GETTING RESPONSE from " + fixedTemp);
    console.log("PROMPT IS " + realPrompt);

    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      // body: '{\n  "model": "text-davinci-003",\n  "prompt": "You: What have you been up to?\\nFriend: Watching old movies.\\nYou: Did you watch anything interesting?\\nFriend:",\n  "temperature": 0.5,\n  "max_tokens": 60,\n  "top_p": 1.0,\n  "frequency_penalty": 0.5,\n  "presence_penalty": 0.0,\n  "stop": ["You:"]\n}',
      body: JSON.stringify({
        'model': 'text-davinci-003',
        'prompt': realPrompt + fixedTemp + '\nFriend:',
        'temperature': 0.5,
        'max_tokens': 60,
        'top_p': 1,
        'frequency_penalty': 0.5,
        'presence_penalty': 0,
        'stop': [
          'You:'
        ]
      })
    }).then((response) => response.json())
      .then((further) => further.choices[0].text.replace(/^\s+|\s+$/g, ''))
      .then((json) => {

        console.log("RESPONSE IS " + (json));
        setAIResponse(json);
        setVisibleAI(true);

        let str = realPrompt;
        str = str.concat(fixedTemp, "\nFriend: ", json, "\nYou: ");
        setPrompt(str);
        realPrompt = realPrompt.concat(fixedTemp, "\nFriend: ", json, "\nYou: ");
        let jo = chats;
        jo.push([json, true]);
        let dct = []
        for (let a = 0; a < jo.length; a++) {
          dct.push(jo[a]);
        }
        setChats(dct);

      });


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


  return (
    <>
      <Box
        height={"full"}
        backgroundColor={""}
        bg={{
          linearGradient: {
            colors: ['gray.200', 'white'],
            start: [0, 0],
            end: [1, 0]
          }
        }}
      >
        <Heading position={"absolute"} right={"24"} top={"12"} paddingBottom={"10"} fontStyle={"oblique"} fontSize={"4xl"} textAlign={"center"}>
          <Text>Chat with AI!</Text>
        </Heading>


        <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
          <AntDesign name="left" size={30} color="black" style={{ marginLeft: 10, marginTop: 60 }} />
        </TouchableOpacity>

        <View>
          <ScrollView height={"4/5"} space={0}>

            <Spacer marginTop={"8"} />

            {chats.map((chat) => <ChatMessage key={Math.random()} right={chat[1]} message={chat[0]} />
            )}

            {/*{actText ? <ChatMessage right={false} message={fixedDisplay} /> : <ActivityIndicator size="large" />}
            {visibleAI ? <ChatMessage right={true} message={AIResponse} /> : <></>}*/}
          </ScrollView>





        </View>
        <Box
          width={"full"}
          position={"absolute"}
          bottom={"10"}
          alignItems={"center"}
        >
          <Recorder
            loading1={setIsTranscribed}
            loading2={setActTextHandler}
            transcribe={tts}
            setRecordings={setRecordings}
            withTimer={false}
          />


        </Box>



      </Box>
    </>
  );
}


const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row'
  },
  itemIn: {
    marginLeft: 20
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  }


});

export default ChatScreen;