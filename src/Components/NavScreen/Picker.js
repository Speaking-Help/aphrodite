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

        <Box
          onTouchEnd={() => navigation.navigate('Practice')}

          paddingTop={"12%"}
          rounded="lg"
          bg={{
            linearGradient: {
              colors: ['gray.700', 'gray.800'],
              start: [0, 0],
              end: [0.5, 0.5]
            }
          }}
          alignItems={"center"}

          width={"3/4"}
          height="20%"
        >
          <Heading color="white" justifyContent={"center"} size="xl"   >
            Open Practice
          </Heading>
        </Box>

        <Box
          onTouchStart={() => navigation.navigate('Chat')}
          marginTop={"5"}
          rounded="lg"
          backgroundColor={"black"}
          width={"3/4"}
          height="20%"
          paddingTop={"12%"}
          alignItems={"center"}
          bg={{
            linearGradient: {
              colors: ['gray.800', 'gray.700'],
              start: [0, 0],
              end: [1, 0]
            }
          }}
        >
          <Heading color='white' flexDirection={"row"} justifyContent={"center"} size="xl"  >
            Chatbot
          </Heading>
        </Box>

      </Center>
      <VStack space={4} alignItems="center">
        <IconButton onPress={() => setModalVisible(true)} size={"lg"} variant="solid" _icon={{
          as: MaterialIcons,
          name: "menu"
        }} />
      </VStack>

      <Box position={'absolute'} bottom={'-130'} height={'30%'} flex={1} safeAreaTop width="100%" alignSelf="center">

        <HStack bg="indigo.900" alignItems="center" safeAreaBottom shadow={6}>

          <Pressable cursor="pointer" py="2" flex={1} onPress={() => navigation.navigate('Rebase')}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={'hammer'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Rebase
              </Text>
            </Center>
          </Pressable>

          <Pressable cursor="pointer" py="2" flex={1} onPress={() => setModalVisible(!modalVisible)}>
            <Center>
              <Icon mb="1" as={<MaterialCommunityIcons name={'logout'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Logout
              </Text>
            </Center>
          </Pressable>

          <OpenURLButton url={"https://www.hccts.org/"}>Open Supported URL</OpenURLButton>

        </HStack>
      </Box>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Log out?</Modal.Header>
          <Modal.Footer>
            <Button.Group space={2}
            ><Button onPress={() => {
              setModalVisible(false);
            }}>
                No
              </Button>

              <Button  colorScheme="secondary" onPress={() => {
                setModalVisible(false);
                navigation.navigate('FirstScreen');

              }}>
                Yes
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}

export default Picker;