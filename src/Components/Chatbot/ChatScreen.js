import { Button, Center, Container, Heading, ScrollView, Text, View, VStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import Recorder from "../Recorder/Recorder";
import Message from "./Message";
import { AntDesign } from "@expo/vector-icons";

import { moderateScale } from "react-native-size-matters";
import Svg from "react-native-svg";
import { Path } from "react-native-svg";
import { Image } from "react-native-svg";
import { Box } from "native-base";

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
            <View style={[styles.item, styles.itemIn]}>
              <View style={[styles.balloon, { backgroundColor: '#bb445f' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>Hey! How are you?</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowLeftContainer,
                  ]}
                >

                  <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      fill="#bb445f"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>


            <View style={[styles.item, styles.itemOut]}>
              <View style={[styles.balloon, { backgroundColor: '#30c8cf' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>Hi! I am doing well. How <Text color={"red.500"}>is</Text> your day going?</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowRightContainer,
                  ]}
                >
                  <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                      fill="#30c8cf"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>


            <View style={[styles.item, styles.itemIn]}>
              <View style={[styles.balloon, { backgroundColor: '#bb445f' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>My day is going well. Thank you for asking.</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowLeftContainer,
                  ]}
                >

                  <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      fill="#bb445f"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>
            <View style={[styles.item, styles.itemIn]}>
              <View style={[styles.balloon, { backgroundColor: '#bb445f' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>What do you do for fun?</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowLeftContainer,
                  ]}
                >

                  <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      fill="#bb445f"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>


            <View style={[styles.item, styles.itemOut]}>
              <View style={[styles.balloon, { backgroundColor: '#30c8cf' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>I like to play lots of game<Text color={"red.500"}>s</Text>.</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowRightContainer,
                  ]}
                >
                  <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                      fill="#30c8cf"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>

            <View style={[styles.item, styles.itemOut]}>
              <View style={[styles.balloon, { backgroundColor: '#30c8cf' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>What is <Text color={"red.500"}>your</Text> favorite hobby?</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowRightContainer,
                  ]}
                >
                  <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                      fill="#30c8cf"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>

            <View style={[styles.item, styles.itemIn]}>
              <View style={[styles.balloon, { backgroundColor: '#bb445f' }]}>
                <Text style={{ paddingTop: 5, color: 'white' }}>I like reading.</Text>
                <View
                  style={[
                    styles.arrowContainer,
                    styles.arrowLeftContainer,
                  ]}
                >

                  <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                    <Path
                      d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      fill="#bb445f"
                      x="0"
                      y="0"
                    />
                  </Svg>
                </View>
              </View>
            </View>



          </ScrollView>

        </View>
        <Box
          width={"full"}
          position={"absolute"}
          bottom={"10"}
          alignItems={"center"}
        >          <Recorder />
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