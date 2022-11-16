
import { Avatar, VStack } from "native-base";


const Moodal = () => {

    return (
        <>
            <VStack>
                <Avatar activeOpacity={0.01} alignSelf="center" bg="amber.500" size="lg" source={require('./brett.jpeg')} />
                <Avatar alignSelf="center" bg="amber.500" size="lg" source={require('./jose.jpeg')} />
                <Avatar alignSelf="center" bg="amber.500" size="lg" source={require('./mary.jpeg')} />
                <Avatar alignSelf="center" bg="amber.500" size="lg" source={require('./jane.jpeg')} />

            </VStack>
        </>
    );
};

export default Moodal;