import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import ContentLoader from "react-native-easy-content-loader";
import * as mime from 'react-native-mime-types';


import React from 'react';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';

const Recorder = (props) => {
    const [recording, setRecording] = React.useState();
    const [recordings, setRecordings] = React.useState([]);
    const [message, setMessage] = React.useState("");


    async function startRecording() {
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

    async function stopRecording() {
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
    }


    function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
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
        <>
            <TouchableOpacity style={{ height: 100 }} onPress={recording ? stopRecording : startRecording}>
                {!recording ? <Image source={require('./down.png')} style={{ justifyContent: 'center', alignself: 'center', textAlign: 'center', alignItems: 'center', flex: 100, width: 100, height: 120 }} /> :
                    <Image source={require('./rec.png')} style={{ justifyContent: 'center', alignself: 'center', textAlign: 'center', alignItems: 'center', flex: 100, width: 100, height: 120 }} />}
            </TouchableOpacity>
            <StatusBar style="auto" />
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
        margin: 16
    }
});

export default Recorder;