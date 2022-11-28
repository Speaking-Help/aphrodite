import { HStack, Link, View, VStack, Text, Box, FormControl, Input, Heading, Center, Button, Image } from "native-base";
import { useState } from "react";
import { Pressable, ImageBackgroun, StyleSheet, TextInput } from "react-native";
import { Modal } from "native-base";
import * as React from 'react';
import Enter from "./Enter";

/**
 * This is the first screen (otherwise known as the login screen)-
 * Log In or Sign Up + Logo
 */
const FirstScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [modal2Visible, setModal2Visible] = React.useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Center
        style={{
          height: 1000
        }}
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

        <Enter
          password={password}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setPassword={setPassword}
          setEmail={setEmail}
          navigate={() => navigation.navigate('PickingScreen')}
        />

        <Enter
          password={password}
          modalVisible={modal2Visible}
          setModalVisible={setModal2Visible}
          setPassword={setPassword}
          setEmail={setEmail}
          navigate={() => navigation.navigate('PickingScreen')}
        />

      </Center>
    </View >

  );
}

export default FirstScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1
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
