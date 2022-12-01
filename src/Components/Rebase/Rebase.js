
import { VStack, Text, Button, View, Center, Spacer, Box, Heading } from "native-base";
import Recorder from "../Recorder/Recorder";
import React from "react";
import * as mime from 'react-native-mime-types';
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";


/**
 * Modal to change the voice of your Text-To-Speech AI
 */
const Rebase = ({ navigation }) => {

  const [recordings, setRecordings] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);

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
        height={"full"}
      >
        <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
          <AntDesign name="left" size={30} color="black" style={{ position: "aboslute", marginLeft: 10, marginTop: 60 }} />
        </TouchableOpacity>
        <Box marginTop={"1/3"} justifyContent="center">
          <Center>
            <VStack width={"3/4"} alignItems="center" space={"lg"}>
              <Heading color="black" size="lg">
                Don't know what to say?
              </Heading>
              <Heading color="black" size="lg">
                Try some of these:
              </Heading>
              <Text color="black" >
                {'\u2022'} These days a chicken leg is a rare dish.
              </Text>
              <Text color="black" >
                {'\u2022'} The boy was there when the sun rose.
              </Text>
              <Text color="black" >
                {'\u2022'} Two blue fish swam in the tank.
              </Text>
              <View>
                <Box>
                  <Recorder currentlyRecording={currentlyRecording} transcribe={jo1} loading1={setIsRecording} loading2={jo} setRecordings={setRecordings} withTimer = {true} />
                </Box>
              </View>
              <Button onPress={() => {
                train();
              }}
                shadow={"9"}
                backgroundColor="green.700"
                opacity={!recordings.length ? 0.3 : 1}
                disabled={!recordings.length}
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