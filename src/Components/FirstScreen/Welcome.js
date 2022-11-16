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
            <ImageBackground  style={{ width: '100%', height: '100%' }} source={require('./lightbulb.jpg')}>
                <Heading  style={{ color: 'white', paddingTop: 80 }} size="2xl" alignSelf="center">
                    Speechit
                </Heading>
                <Center w="100%" alignItems="center" justifyContent="center">
                    <Box safeArea p="2" w="90%" maxW="290" py="8">


                        <HStack height={500} space={3} mt="5">
                            <Button variant="subtle" rounded={'full'} style={{
                                position: 'absolute',
                                bottom: -30,
                                right: 170,
                                width: 100
                            }} justifyContent="center" size="lg" color="coolGray.800" _dark={{
                                color: "warmGray.50"
                            }} fontWeight="semibold">
                                Join
                            </Button>

                            <Button colorScheme="secondary" rounded={'full'} onPress={() => navigation.navigate('RECORDINGUI')} style={{
                                position: 'absolute',
                                bottom: -30,
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
            </ImageBackground>
        </View >

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
