import { Modal, Button, FormControl, Image } from "native-base";
import { TextInput } from "react-native";

import { Box } from "native-base";
import { Divider } from "native-base";
import { View } from "native-base";
import { Text } from "native-base";
/**
 * Multi-use component to handle logging in/registering. Takes the form of
 * a modal.
 */
const Enter = (props) => {
    return (

        <Modal isOpen={props.modalVisible}
            onClose={() => {
                props.setModalVisible(false);
                props.setEmail("");
                props.setPassword("");
            }}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Log in with email!</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <TextInput
                            placeholder="Email"
                            onChangeText={input => props.setEmail(input)}
                            defaultValue={props.email}
                            style={{ height: 30, borderColor: 'gray', borderWidth: 1 }} autoCapitalize='none' />
                    </FormControl>
                    <FormControl mt="3">
                        <FormControl.Label>Password</FormControl.Label>
                        <TextInput
                            placeholder="Password..."
                            onChangeText={input => props.setPassword(input)}
                            defaultValue={props.password}
                            style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
                            autoCapitalize='none'
                            secureTextEntry={true} />
                    </FormControl>
                    <View style={{ paddingTop: 15, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <Image paddingTop={"10"} source={require('./googleLogin.png')} height={"10"} width={"64"} />
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                            props.setModalVisible(false);
                        }}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            props.setModalVisible(false);
                            props.navigate();

                        }}>
                            Login
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
}

export default Enter;