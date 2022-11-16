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
const Welcome = ({ navigation }) => {

    return (
        <View style={styles}>
                <Heading  style={{color:'white', paddingTop:30}} size="2xl" alignSelf="center">
                    Speechit
                </Heading>
                <Center w="100%" alignItems="center" justifyContent="center">
                    <Box safeArea p="2" w="90%" maxW="290" py="8">
                        <Heading justifyContent="center" size="lg" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }} fontWeight="semibold">
                            Create New Account
                        </Heading>
                        <Heading mt="1" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="medium" size="xs">
                            <HStack justifyContent="center">
                                <Text>Already Registered?</Text>
                            </HStack>
                        </Heading>
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>Name</FormControl.Label>
                                <Input placeholder="John Doe" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Email</FormControl.Label>
                                <Input placeholder="person@person.com" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input type="password" placeholder="enter" />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Confirm Password</FormControl.Label>
                                <Input type="password" placeholder="enter" />
                            </FormControl>
                            <Button mt="2" colorScheme="indigo" onPress={() => navigation.navigate('RECORDINGUI')}>
                                Sign up
                            </Button>
                            <Pressable onPress={() => navigation.navigate('RECORDINGUI')}>
                                <Image style={{ height: 50, width: 500 }} size="xs" source={require('./googleAuth.png')} />
                            </Pressable>
                        </VStack>


                    </Box>


                </Center>
        </View>

    );
}

export default Welcome;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center"
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
