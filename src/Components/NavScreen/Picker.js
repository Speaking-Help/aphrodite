import { Heading, HStack, Pressable, View, Button, Text, VStack, IconButton, Box, Center, Icon } from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, Linking } from "react-native";
import { useState, useCallback } from "react";
import { FormControl } from "native-base";
import { TextInput } from "react-native";
import * as React from 'react';

import { Modal } from "native-base";
/**
 * Main Navigation screen- central screen between all other components 
 */
const Picker = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);


  /**
   * Button capable of navigating to url on Safari- used to navigate to HCCTS link
   */
  const OpenURLButton = ({ url, children }) => {

    const handlePress = useCallback(async () => {
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
      <Pressable onPress={handlePress}>
        <Center>
          <Icon mb="1" as={<MaterialCommunityIcons name={'information'} />} color="white" size="sm" />
          <Text color="white" fontSize="12">
            About
          </Text>
        </Center>
      </Pressable>);

  };


  return (
    <View style={{ flex: 1 }}>
      <Center
        flex={1}
        bg={{
          linearGradient: {
            colors: ['blue.300', 'blue.400'],
            start: [0, 0],
            end: [1, 0]
          }
        }}
      >

        <VStack
          height={"80"}
          width={"3/4"}
          justifyContent={"center"}
          space={"1/5"}
        >
          <Box
            onTouchEnd={() => navigation.navigate('Practice')}

            rounded="lg"
            bg={{
              linearGradient: {
                colors: ['gray.700', 'gray.800'],
                start: [0, 0],
                end: [0.5, 0.5]
              }
            }}

            alignItems={"center"}
            justifyContent={"center"}

            height={"1/3"}
          >
            <Heading color="white" size="xl"   >
              Practice
            </Heading>
          </Box>

          <Box
            onTouchStart={() => navigation.navigate('Chat')}

            rounded="lg"
            bg={{
              linearGradient: {
                colors: ['gray.800', 'gray.700'],
                start: [0, 0],
                end: [1, 0]
              }
            }}

            alignItems={"center"}
            justifyContent={"center"}

            height={"1/3"}
          >
            <Heading color='white' size="xl"  >
              Chatbot
            </Heading>
          </Box>
        </VStack>

        <HStack
          height={'20'}
          width={"full"}
          bg="indigo.900"
          alignItems={"center"}
          shadow={6}
          justifyContent="center"
          space={"1/4"}
          position={"absolute"}
          bottom={0}
        >
          <Pressable onPress={() => navigation.navigate('Rebase')}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={'hammer'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Set Voice
              </Text>
            </Center>
          </Pressable>

          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={'logout'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Logout
              </Text>
            </Center>
          </Pressable>

          <OpenURLButton url={"https://www.hccts.org/"}>Open Supported URL</OpenURLButton>
        </HStack>

      </Center>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content textAlign={"center"}>
          <Modal.CloseButton />
          <Modal.Header >Log out?</Modal.Header>
          <Modal.Footer>
            <Button.Group space={2}
            >
              <Button colorScheme="secondary" onPress={() => {
                setModalVisible(false);
                navigation.navigate('FirstScreen');

              }}>
                Yes
              </Button>

              <Button onPress={() => {
                setModalVisible(false);
              }}>
                No
              </Button>


            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

export default Picker;