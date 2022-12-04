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

  // Visibility of Log In
  const [modalVisible, setModalVisible] = React.useState(false);

  // Visibility of Register
  const [modal2Visible, setModal2Visible] = React.useState(false);

  // Password and email variables
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <Box
        height={"full"}
        bg={{
          linearGradient: {
            colors: ['blue.300', 'blue.500'],
            start: [0, 0],
            end: [0.5, 0.5]
          }
        }}
      >
        <Heading style={{ color: 'white' }} size="4xl" alignSelf="center" position={"absolute"} top={"1/6"}>
          Loqui
        </Heading>
        <Center w="100%" alignItems="center" justifyContent="center" position={"absolute"} bottom={"20"}>
            {/* Old Login Buttons */}
            {/* <HStack height={50} space={'lg'}>
              <Button variant="subtle" rounded={'full'} onPress={() => {
                setModal2Visible(!modal2Visible);
              }}
              width={"1/3"}
              justifyContent="center" size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} fontWeight="semibold">
                Join
              </Button>

              <Button colorScheme="secondary" rounded={'full'} onPress={() => {
                setModalVisible(!modalVisible);
              }}
              width={"1/3"}
              justifyContent="center" size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} fontWeight="semibold">
                Login
              </Button>
            </HStack> */}

            {/* Sign in with Google */}
            <Box shadow={"9"}>
            <Button 
              backgroundColor={"transparent"} 
              padding={"0"}
              style={{ aspectRatio: 105.5/21.2 }}
              width={"2/3"}
              rounded={"lg"}
              overflow={"hidden"}
              onPress={() => {
                navigation.navigate('PickingScreen')
              }}
            >
              <Image source={require('./googleLogin.png')} resizeMode={"contain"} alt={"Google sign in button"} />
            </Button>
            </Box>
        </Center>

        {/* Old Modal System */}
        {/* <>
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
        </> */}

      </Box>
    </View >

  );
}

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

export default FirstScreen;