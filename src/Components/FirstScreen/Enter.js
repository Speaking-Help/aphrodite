import { Modal, Button, FormControl } from "native-base";
import { TextInput } from "react-native";

import { Box } from "native-base";



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
                    <Box borderRadius={"full"} borderColor={"black"}>
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
                    </Box>
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