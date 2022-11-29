import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ContentLoader from "react-native-easy-content-loader";
import * as mime from 'react-native-mime-types';
import { Ionicons } from '@expo/vector-icons';



import React from 'react';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { Center } from 'native-base';

/**
 * Recorder used throughout the app
 */
const Recorder = (props) => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [recordingStarted, setRecordingStarted] = React.useState(false);
    const [recordingEnded, setRecordingEnded] = React.useState(false);



    /**
     * Begins recording
     */
    async function startRecording() {
        
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
        setRecordingEnded(true);

        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDurationFormatted(status.durationMillis),
            file: recording.getURI()
        });

        
        setRecordings(updatedRecordings);
        props.setRecordings(updatedRecordings);

        console.log("end of function " + recordings.length);

        setRecordingEnded(false);
        setRecordingStarted(false);

    }

    async function endOfRecording() {
        await stopRecording();
        console.log("CALLED");
        props.transcribe();
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

    return (
            <View>
                <TouchableOpacity onPress={recording ? endOfRecording : startRecording}>
                    {
                    !recording ?
                      <Ionicons name="mic-sharp" size={40} color={"black"} /> 
                      :
                      <Ionicons name="mic-sharp" size={40} color={"red"} />
                    }
                </TouchableOpacity>
            </View>
    );
}

export default Recorder;