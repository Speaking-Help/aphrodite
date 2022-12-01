import { Button, Center, Container, Heading, ScrollView, Text, View, VStack, Box } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Recorder from "../Recorder/Recorder";
import Message from "./Message";
import { AntDesign } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import Svg, { Path, Image } from "react-native-svg";
import ChatMessage from "./ChatMessage";

/**
 * Chatbot screen- interact with chatbot
 * TODO connect to chatbot
 */
const ChatScreen = ({ navigation }) => {
  return (
    <>
      <View
        height={"full"}
        backgroundColor={"warmGray.600"}>



        <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
          <AntDesign name="left" size={30} color="black" style={{ marginLeft: 10, marginTop: 60 }} />
        </TouchableOpacity>

        <View >
          <ScrollView space={0}>
            <Heading paddingBottom={"10"} fontStyle={"oblique"} fontSize={"4xl"} textAlign={"center"}>
              Chat with AI!
            </Heading>

            <ChatMessage right={true} message={"Hi! How are you?"} />
            <ChatMessage right={false} message={"Hi! I am doing well. How is your day going?"} />
            <ChatMessage right={true} message={"My day is going well. Thank you for asking."} />
            <ChatMessage right={true} message={"What do you do for fun?"} />
            <ChatMessage right={false} message={"I like to play lots of games."} />
            <ChatMessage right={false} message={"What is your favorite hobby?"} />
            <ChatMessage right={true} message={"I like reading"} />

          </ScrollView>

        </View>
        <Box
          width={"full"}
          position={"absolute"}
          bottom={"10"}
          alignItems={"center"}
        >
          <Recorder />
        </Box>



      </View>
    </>
  );
}


const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row'
  },
  itemIn: {
    marginLeft: 20
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  }


});

export default ChatScreen;