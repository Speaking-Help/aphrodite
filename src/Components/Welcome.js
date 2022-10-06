import { HStack, Link, View, VStack } from "native-base";
import { Text } from "native-base";
import { Box } from "native-base";
import { FormControl } from "native-base";
import { Input } from "native-base";
import { Heading } from "native-base";
import { Center } from "native-base";
import { Button } from "native-base";

const Welcome = ({ navigation }) => {

    return (
        <View>
            <Center w="100%" alignItems="center">
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        Create New Account
                    </Heading>
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        <HStack>
                            <Text>Already Registered?</Text>
                            <Button size="sm" title="Log in" onPress={() => navigation.navigate('RECORDINGUI')} > Log In </Button>
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
                        <Button mt="2" colorScheme="indigo">
                            Sign up
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </View>

    );
}

export default Welcome;