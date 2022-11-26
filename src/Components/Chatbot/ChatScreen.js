import { Button, Center, Container, ScrollView, Text, View, VStack } from "native-base";
import Recorder from "../BasicUtil/Recorder";
import { StyleSheet } from "react-native";
import Message from "./Message";




/**
 * Chatbot screen- interact with chatbot
 * TODO connect to chatbot
 */
const ChatScreen = () => {
    return (
        <>
            <View >
                <Button> TODO </Button>
                <ScrollView space={0} >
                    <VStack space={0}>
                        <Message right={true} text={"How are you doing today?"} />
                        <Message right={false} text={"Doing pretty well and you?"} />
                        <Message right={true} text={"Okay. Would you like to order?"} />
                        <Message right={false} text={"Sure, I'll take a  burrito"} />
                        <Message right={true} text={"Fantastic, do you want any toppings?"} />
                    </VStack>

                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>
                    <Text>Helloe</Text>

                </ScrollView>

            </View>
            <Center>
                <View style={{ justifyContent: 'center', alignContent: 'center', position: 'absolute', bottom: 0 }}>
                    <Recorder />
                </View>
            </Center>

        </>
    );
}

const styles = StyleSheet.create(theme => ({

}));

export default ChatScreen;