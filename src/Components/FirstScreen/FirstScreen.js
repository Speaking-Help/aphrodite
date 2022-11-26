import { HStack, Link, View, VStack } from "native-base";
import { Text } from "native-base";
import { Box } from "native-base";
import { FormControl } from "native-base";
import { Input } from "native-base";
import { Heading } from "native-base";
import { Center } from "native-base";
import { Button } from "native-base";

import { Image } from "native-base";
import { Pressable } from "react-native";
import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
const FirstScreen = ({ navigation }) => {

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
              <Button variant="subtle" rounded={'full'} onPress={() => navigation.navigate('PickingScreen')} style={{
                position: 'absolute',
                bottom: '20%',
                right: 170,
                width: 100
              }} justifyContent="center" size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
              }} fontWeight="semibold">
                Join
              </Button>

              <Button colorScheme="secondary" rounded={'full'} onPress={() => navigation.navigate('PickingScreen')} style={{
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
