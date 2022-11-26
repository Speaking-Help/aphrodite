import { View } from "native-base";
import Recorder from "../BasicUtil/Recorder";
import React from "react";
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider } from "native-base";


const ResponsiveBox = (props) => {
    return (
    <Box alignItems="center">
        <Box width="100%" height="50%" rounded="lg" overflow="hidden">

            <Stack p="4" space={3}>
                <Text fontWeight="400">
                    {props.text}
                </Text>
            </Stack>
        </Box>
    </Box>);
}

export default ResponsiveBox;