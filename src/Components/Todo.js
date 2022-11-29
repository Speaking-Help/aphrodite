import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";


import React from 'react';
import { Box, Center, Heading } from 'native-base';

/**
 * Simple Todo page
 */
const Todo = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("PickingScreen")}>
        <AntDesign name="left" size={30} color="black" style={{ marginLeft: 10, marginTop: 40 }} />
      </TouchableOpacity>
      <Center height={"full"}>
        <Ionicons name="hammer-outline" size={40} color={"black"} />
        <Heading>
          This page is under construction!
        </Heading>
      </Center>
    </View>
  );
}

export default Todo;