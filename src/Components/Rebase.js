
import { VStack } from "native-base";
import Recorder from "./BasicUtil/Recorder";
import { Text } from "react-native-svg";
import React from "react";
import * as mime from 'react-native-mime-types';
import { Button } from "native-base";

const Rebase = () => {

    async function uploadAudioAsync(uri) {
        let apiUrl = 'http://127.0.0.1:5000/train';
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


        return fetch(apiUrl, options)
            .then((response) => response.text())
            .then((json) => {
                console.log(json);
                setTranscribedText(json);
                return json;
            });
    }

    async function postStuff() {
        let length = recordings.length;
        console.log(length)
        console.log("\n\n\n")
        let uri = await recordings[length - 1].file;
        console.log(mime.lookup(uri));
        await uploadAudioAsync(uri);
    }

    const [recordings, setRecordings] = React.useState([]);

    return (
        <>
            <VStack justifyContent={"center"}>
                <Text>\n\n\n</Text>
                <Recorder setRecordings={setRecordings} />
            </VStack>
            <Button onPress={() => {
                postStuff();
            }}> Train </Button>
        </>
    );
}

export default Rebase;