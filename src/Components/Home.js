import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import ContentLoader from "react-native-easy-content-loader";
import * as mime from 'react-native-mime-types';
import Recorder from './Recorder/Recorder';


import React from 'react';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

export default function Home() {
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

  function getRecordingLines() {
    <TouchableOpacity style={{ height: 100 }}>
      <Image source={require('./rec.png')} style={{ justifyContent: 'center', alignself: 'center', textAlign: 'center', alignItems: 'center', flex: 100, width: 100, height: 120 }} />
    </TouchableOpacity>
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
          <Button style={styles.button} onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
          <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
        </View>
      );
    });
  }


  return (
    <View style={styles.container}>

      <Recorder setRecordings={setRecordings}/>
      {getRecordingLines()}
      {loadingText ? <ContentLoader active pRows={4} /> : <Text> Hello </Text>}
      <Button title="load" onPress={() => (getStuff())} />

      <Button title="Transcribe Most Recent" onPress={() => (postStuff())} />
      <Button title="Fix Up" onPress={() => (fixup())} />

      <Text>{transcribedText}</Text>
      <Text>{fixedText}</Text>

      <StatusBar style="auto" />
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
  }
});

