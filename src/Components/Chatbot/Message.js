import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Box, Center, InputLeftAddon, View } from "native-base";
import { Image } from "react-native";
import botty from "./botty.png";

const Message = (props) => {
    const alignIt = props.right ? "right" : "left";

    const distance = props.right ? 20: -100;

    return (
        <>
        <Image source ={require=("botty.png")} />
        <Box
            style={{
                right: distance,
                width: 300
            }}
            alignSelf="right"
            p="6"
            rounded="lg"
            shadow={2}
            _text={{
                borderWidth: 2,
                borderRadius: 4,
                borderColor: "black", fontSize: 'md', fontWeight: 'bold', color: 'black'
            }}
        >
            {props.text}
        </Box>
        {props.right ? <Image style={{height:40, width:40}}source ={botty} />: <></>}
        </>
    );
};


export default Message

