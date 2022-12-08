import { Button, StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { Center } from 'native-base';
import { StatusBar } from 'expo-status-bar';
import ContentLoader from "react-native-easy-content-loader";
import * as mime from 'react-native-mime-types';
import { Ionicons } from '@expo/vector-icons';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'



import React from 'react';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

/**
 * Recorder used throughout the app
 */
const Recorder = (props) => {
  const [recording, setRecording] = React.useState();
  const [recordingEnabled, setRecordinEnabled] = React.useState(true);
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [recordingStarted, setRecordingStarted] = React.useState(false);
  const [recordingEnded, setRecordingEnded] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  let updatedRecordings = [];


  /**
   * Begins recording
   */
  async function startRecording() {
    if (props.currentlyRecording != undefined) {
      props.currentlyRecording();
    }

    setIsPlaying(true);
    setRecordinEnabled(false);

    console.log("RECORDING STARTED\n");
    if (recordingStarted) {
      return;
    }
    setRecordingStarted(true);
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  /**
   * Ends recording
   */
  async function stopRecording() {
    props.loading1(false);
    props.loading2(false);
    console.log("RECORDING ENDED\n");
    if (recordingEnded) {
      return;
    }

    setIsPlaying(true);
    setIsPlaying(false);
    setRecordingEnded(true);

    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });


    console.log("RECORDINGS UPDATED " + updatedRecordings.length); 

    setRecordings(updatedRecordings);
    props.setRecordings(updatedRecordings);

    //console.log("end of function " + recordings.length);

    setRecordingEnded(false);
    setRecordingStarted(false);

  }

  async function endOfRecording() {
    await stopRecording();
    console.log("CALLED");
    console.log("LENGTH HERE IS " + updatedRecordings.length)
    props.transcribe(updatedRecordings);
  }

  /**
   * Gets precise duration of recording for accurate playback
   */
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  const MicButton = ({ }) => (
    <Pressable disabled={!recordingEnabled && props.withTimer} onPress={recording ? endOfRecording : startRecording}>
      {
        !recording ?
          <Ionicons name="mic-sharp" size={60} color={"black"} />
          :
          <View>
            {
              (!recordingEnabled && props.withTimer) ?
                <View opacity={"0.3"}>
                  <Ionicons name="mic-sharp" size={60} color={"#C62828"} />
                </View>
                :
                <Ionicons name="mic-sharp" size={60} color={"#C62828"} />
            }
          </View>
      }
    </Pressable>
  )

  return (
    <View>
      {props.withTimer ?
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={3}
          trailColor={"transparent"}
          colors={"black"}
          size={100}
          strokeWidth={4}
          onComplete={() => {
            setIsPlaying(false);
            setRecordinEnabled(true);
            return { initialRemainingTime: 0, shouldRepeat: true }
          }}
        >
          {({ }) => (
            <MicButton />
          )}
        </CountdownCircleTimer>
        :
        <MicButton />
      }
    </View>
  );
}

export default Recorder;