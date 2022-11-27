import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import ContentLoader from "react-native-easy-content-loader";
import * as mime from 'react-native-mime-types';
import { Ionicons } from '@expo/vector-icons';



import React from 'react';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

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
        console.log("end of function\n");

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
        <>
            <View style={{
                position: 'absolute',
                bottom: 10,
                left: 90

            }}>


                <TouchableOpacity style={styles.button} onPress={recording ? endOfRecording : startRecording}>
                    {!recording ? <Ionicons name="mic-sharp" size={170} color={"black"} /> :

                        <Ionicons name="mic-sharp" size={170} color={"red"} style={{ justifyContent: 'center', alignself: 'center', textAlign: 'center', alignItems: 'center' }} />}
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        </>
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
        backgroundColor: 'yellow',
        borderRadius: 20,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#303838',
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        shadowOpacity: 0.35,
        height: 175,
        width: 175,
        margin: 16,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export default Recorder;