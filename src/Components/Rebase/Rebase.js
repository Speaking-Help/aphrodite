
import { VStack, Button, View, Center, Spacer, Box } from "native-base";
import Recorder from "../Recorder/Recorder";
import { Text } from "react-native-svg";
import React from "react";
import * as mime from 'react-native-mime-types';
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'


/**
 * Modal to change the voice of your Text-To-Speech AI
 */
const Rebase = ({ navigation }) => {

  const [recordings, setRecordings] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <Text>Too late...</Text>
    }

    return (
      <>
        <Text>Too late...</Text>
        <Text>{remainingTime}</Text>
        <Text>Too late...</Text>
      </>
    );
  };




  const UrgeWithPleasureComponent = () => (
    <CountdownCircleTimer
      isPlaying
      duration={6}
      colors={['#0b2f0d', '#13ec80', '#75ec13', '#dce817', '#e61930']}
      colorsTime={[6, 5, 3, 2, 0]}
      size={100}
      strokeWidth={7}
    >
      {renderTime}
    </CountdownCircleTimer>
  )



  /**
   * Uploads recorded voice clip to Flask API and receieves transcription
   */
  async function uploadAudioAsync(uri) {
    console.log("CALL")
    console.log("FETCHING");

    //format body
    let apiUrl = 'http://127.0.0.1:5000/train';
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
        console.log("HOWDY");
      });
  }




  /**
* Performs transcription- gathers proper clip and uses 
* uploadAudioAsync.
*/
  async function train() {
    console.log("TExT TO SPEECh");
    let length = recordings.length;
    let uri = await recordings[length - 1].file;
    console.log(mime.lookup(uri));
    await uploadAudioAsync(uri);
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

  // TODO: What are jo and jo1?
  const jo = (howdy) => {
    return;
  }
  const jo1 = () => {
    return;
  }

  const currentlyRecording = () => {
    console.log("Should change color!");
    setIsRecording(!isRecording);
  }

  return (
    <View>
      <Box
        bg={{
          linearGradient: {
            colors: ['green.300', 'green.400'],
            start: [0, 0],
            end: [1, 0]
          }
        }}
      >
        {isRecording ?

          <View>
            <Box style={{ position: "absolute", marginLeft: 140, marginTop: 350 }}>
              <UrgeWithPleasureComponent >
                <Text style={{ position: "absolute", marginLeft: 0, marginTop: 0 }}> I am here </Text>
              </UrgeWithPleasureComponent>
            </Box>
            <MaterialCommunityIcons name="clock-time-twelve-outline" size={80} color="red" style={{ position: "absolute", marginLeft: 150, marginTop: 360 }} />
          </View>
          :

          <MaterialCommunityIcons name="clock-time-four-outline" size={80} color="black" style={{ position: "absolute", marginLeft: 155, marginTop: 350 }} />}


        <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
          <AntDesign name="left" size={30} color="black" style={{ position: "aboslute", marginLeft: 10, marginTop: 40 }} />
        </TouchableOpacity>
        <Box height={"full"} justifyContent="center">
          <Center>
            <VStack width={"3/4"} alignItems="center" space={"lg"}>
              <Recorder currentlyRecording={currentlyRecording} transcribe={jo1} loading1={setIsRecording} loading2={jo} setRecordings={setRecordings} />
              {/* TODO: Disable until after recording */}
              <Button onPress={() => {
                train();
              }}
                shadow={"9"}
                backgroundColor="green.700"
              >
                Learn my Voice!
              </Button>
            </VStack>
          </Center>
        </Box>
      </Box>
    </View>
  );
}

export default Rebase;