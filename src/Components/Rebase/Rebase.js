
import { VStack, Button, View, Center, Spacer, Box } from "native-base";
import Recorder from "../Recorder/Recorder";
import { Text } from "react-native-svg";
import React from "react";
import * as mime from 'react-native-mime-types';
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

/**
 * Modal to change the voice of your Text-To-Speech AI
 */
const Rebase = ({ navigation }) => {

  const [recordings, setRecordings] = React.useState([]);


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
        <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
          <AntDesign name="left" size={30} color="black" style={{ marginLeft: 10, marginTop: 40 }} />
        </TouchableOpacity>
        <Box height={"full"} justifyContent="center">
          <Center>
            <VStack width={"3/4"} alignItems="center" space={"lg"}>
              <Recorder transcribe={jo1} loading1={jo} loading2={jo} setRecordings={setRecordings} />
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