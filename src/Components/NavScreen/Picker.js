import { HStack, View } from "native-base";
import { Button } from "native-base";
import { Text } from "native-base";
import { VStack } from "native-base";

const Picker = ({ navigation }) => {
    return (
        <VStack space={4} alignItems="center">
            <Text fontSize="xl">Choose your adventure!</Text>
            <Button onPress={() => navigation.navigate('Chat')}>
                Chatbot
            </Button>
            <Button onPress={() => navigation.navigate('Automatic')}>
                Automatic
            </Button>
        </VStack >
    );
}

export default Picker;