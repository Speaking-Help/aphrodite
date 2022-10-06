import { View } from "native-base";
import Recorder from "../Recorder/Recorder";
import React from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";


const ResponsiveBox = (props) => {

    const Title = props.response ? "What you said" : "What you meant";

    return (
    <Box alignItems="center">
        <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
        }} _web={{
            shadow: 2,
            borderWidth: 0
        }} _light={{
            backgroundColor: "gray.50"
        }}>

            <Stack p="4" space={3}>
                <Stack space={2}>
                    <Heading size="md" ml="-1">
                        <Text>{Title}</Text>
                    </Heading>
                    <Text fontSize="xs" _light={{
                        color: "violet.500"
                    }} _dark={{
                        color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                        The Silicon Valley of India.
                    </Text>
                </Stack>
                <Text fontWeight="400">
                    {props.text}
                </Text>
            </Stack>
        </Box>
    </Box>);
}

export default ResponsiveBox;