import { Heading, HStack, Pressable, View } from "native-base";
import { Button } from "native-base";
import { Text } from "native-base";
import { VStack } from "native-base";
import { IconButton } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Moodal from "./Moodal";
import { ImageBackground, Modal } from "react-native";
import { useState } from "react";
import { Box, Center } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Icon } from "native-base";
import { Linking } from "react-native";
import { useCallback } from "react";
import * as React from 'react';

import Footer from "./Footer";

const Picker = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [automaticTextColor, setAutomaticTextColor] = useState("amber.100");
    const [automaticBoxColor, setAutomaticBoxColor] = useState('violet.800');

    const OpenURLButton = ({ url, children }) => {

        const handlePress = useCallback(async () => {
            console.log("HEYO");
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return (
            <Pressable cursor="pointer" py="2" flex={1} onPress={handlePress}>
                <Center>
                    <Icon mb="1" as={<MaterialCommunityIcons name={'information'} />} color="white" size="sm" />
                    <Text color="white" fontSize="12">
                        About
                    </Text>
                </Center>
            </Pressable>);

    };



    return (
        <>
            <View style={{ flex: 1 }}>
                <ImageBackground style={{ flex: 1, justifyContent: 'center' }} source={require('./prettybg.jpg')}>

                    <Center flex={1} >

                        <Box
                            onTouchStart={() => navigation.navigate('Chat')}
                            rounded="lg"
                            backgroundColor={"black"}
                            width={"3/4"}
                            height="1/3"
                            alignItems={"center"}
                            bg={{
                                linearGradient: {
                                    colors: ['red.100', 'green.800'],
                                    start: [0, 0],
                                    end: [1, 0]
                                }
                            }}
                        >
                            <Heading marginTop={"2/5"} color={automaticTextColor} flexDirection={"row"} justifyContent={"center"} size="xl"  >
                                Chatbot
                            </Heading>
                        </Box>

                        <Box marginTop={"5"}
                            onTouchEnd={() => navigation.navigate('Automatic')}
                            onTouchStart={() => {
                                setAutomaticTextColor('amber.300');
                                setAutomaticBoxColor('indigo.900');
                            }}
                            onTouchEndCapture={() => {
                                setAutomaticTextColor('amber.100');
                                setAutomaticBoxColor('indigo.800');
                            }}

                            

                            paddingTop={"16"}
                            rounded="lg"
                            bg={{
                                linearGradient: {
                                    colors: ['black', automaticBoxColor],
                                    start: [0, 0],
                                    end: [1, 0]
                                }
                            }}
                            alignItems={"center"}

                            width={"3/4"}
                            height="1/3"
                        >
                            <Heading marginTop={"1/5"} color="white" justifyContent={"center"} size="xl"   >
                                Automatic
                            </Heading>
                        </Box>
                    </Center>
                    <VStack space={4} alignItems="center">
                        <IconButton onPress={() => setModalVisible(true)} size={"lg"} variant="solid" _icon={{
                            as: MaterialIcons,
                            name: "menu"
                        }} />
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View
                                style={{
                                    height: '50%',
                                    marginTop: 'auto',
                                    backgroundColor: 'blue'
                                }}>
                                <Moodal />

                                <Button onPress={() => setModalVisible(false)}> Exit</Button>
                            </View>
                        </Modal>
                    </VStack>





                    <Box position={'absolute'} bottom={'-30'} height={'1/5'} flex={1} safeAreaTop width="100%" alignSelf="center">

                        <HStack bg="indigo.900" alignItems="center" safeAreaBottom shadow={6}>
                            <Pressable cursor="pointer" py="3" flex={1} onPress={() => setModalVisible(true)}>
                                <Center>
                                    <Icon mb="1" as={<MaterialCommunityIcons name={'voicemail'} />} color="white" size="sm" />
                                    <Text color="white" fontSize="12">
                                        Voices
                                    </Text>
                                </Center>
                            </Pressable>
                            
                            <OpenURLButton url={"https://www.hccts.org/"}>Open Supported URL</OpenURLButton>
                            <Pressable cursor="pointer" py="2" flex={1} onPress={() => navigation.navigate('Rebase')}>
                                <Center>
                                    <Icon mb="1" as={<MaterialCommunityIcons name={'hammer'} />} color="white" size="sm" />
                                    <Text color="white" fontSize="12">
                                        Rebase
                                    </Text>
                                </Center>
                            </Pressable>
                            <Pressable cursor="pointer" py="2" flex={1} onPress={() => navigation.navigate('LOGIN')}>
                                <Center>
                                    <Icon mb="1" as={<MaterialCommunityIcons name={'logout'} />} color="white" size="sm" />
                                    <Text color="white" fontSize="12">
                                        Logout
                                    </Text>
                                </Center>
                            </Pressable>

                        </HStack>
                    </Box>

                </ImageBackground>
            </View>
        </>

    );
}

export default Picker;