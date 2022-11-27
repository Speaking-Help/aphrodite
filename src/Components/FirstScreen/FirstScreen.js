import { HStack, Link, View, VStack, Text, Box, FormControl, Input, Heading, Center, Button, Image } from "native-base";
import { useState } from "react";
import { Pressable, ImageBackgroun, StyleSheet, TextInput } from "react-native";
import { Modal } from "native-base";
import * as React from 'react';

/**
 * This is the first screen (otherwise known as the login screen)-
 * Log In or Sign Up + Logo
 */
const FirstScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <View style={styles}>
      <Center
        bg={{
          linearGradient: {
            colors: ['blue.300', 'blue.500'],
            start: [0, 0],
            end: [0.5, 0.5]
          }
        }}
      >
        <Heading style={{ color: 'white', paddingTop: 80 }} size="4xl" alignSelf="center">
          Loqui
        </Heading>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Box safeArea p="2" w="90%" maxW="290" py="8">


            <HStack height={500} space={3} mt="5">
              <Button variant="subtle" rounded={'full'} onPress={() => {
                setModal2Visible(!modal2Visible);
              }} style={{
                position: 'absolute',
                bottom: '20%',
                right: 170,
                width: 100
              }} justifyContent="center" size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} fontWeight="semibold">
                Join
              </Button>

              <Button colorScheme="secondary" rounded={'full'} onPress={() => {
                setModalVisible(!modalVisible);
              }} style={{
                position: 'absolute',
                bottom: '20%',
                left: 170,
                width: 100
              }} justifyContent="center" size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} fontWeight="semibold">
                Login
              </Button>
            </HStack>
          </Box>
        </Center>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Log in with email!</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <TextInput ref={initialRef} />
              </FormControl>
              <Box borderRadius={"full"} borderColor={"black"}>
                <FormControl mt="3">
                  <FormControl.Label>Password</FormControl.Label>
                  <TextInput secureTextEntry={true} />
                </FormControl>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                  setModalVisible(false);
                }}>
                  Cancel
                </Button>
                <Button onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('PickingScreen');

                }}>
                  Login
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

        <Modal isOpen={modal2Visible} onClose={() => setModal2Visible(false)} initialFocusRef={initialRef} finalFocusRef={finalRef}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Join!</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <TextInput ref={initialRef} />
              </FormControl>
              <Box borderRadius={"full"} borderColor={"black"}>
                <FormControl mt="3">
                  <FormControl.Label>Password</FormControl.Label>
                  <TextInput secureTextEntry={true} />
                </FormControl>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                  setModal2Visible(false);
                }}>
                  Cancel
                </Button>
                <Button onPress={() => {
                  setModal2Visible(false);
                  navigation.navigate('PickingScreen');

                }}>
                  Login
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>

      </Center>
    </View >

  );
}

export default FirstScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});
