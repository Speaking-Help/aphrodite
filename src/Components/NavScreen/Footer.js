
import { Box } from "native-base";
import { Pressable } from "react-native";
import { Icon } from "native-base";
import { Text } from "native-base";
import { HStack } from "native-base";
import { Center } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback } from "react";
const Footer = () => {

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
        <Box position={'absolute'} bottom={'-35'} height={'1/5'} flex={1} safeAreaTop width="100%" alignSelf="center">

            <HStack bg="indigo.900" alignItems="center" safeAreaBottom shadow={6}>
                <Pressable cursor="pointer" pt="10" py="10" flex={1} onPress={() => setModalVisible(true)}>
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


    )
}

export default Footer;