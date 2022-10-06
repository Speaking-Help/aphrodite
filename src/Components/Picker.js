import { HStack, View } from "native-base";
import { Button } from "native-base";

const Picker = ( {navigation} ) => {
    return (
        <HStack>
        <Button onPress={() => navigation.navigate('Chat')}>
            Chatbot
        </Button>
        <Button onPress={() => navigation.navigate('Automatic')}>
            Automatic
        </Button>
        </HStack >
    );
}

export default Picker;