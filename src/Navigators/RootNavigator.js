import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/BasicUtil/Home';
import FirstScreen from '../Components/FirstScreen/FirstScreen';
import Practice from '../Components/Practice/Practice';
import Picker from '../Components/NavScreen/Picker';
import Chatbot from '../Components/Chatbot/ChatScreen';
import Rebase from '../Components/Rebase';
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HOME"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PickingScreen"
        component={Picker}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Automatic"
        component={Practice}
      />
      <Stack.Screen
        name="Chat"
        component={Chatbot}
      />
      <Stack.Screen
        name="Rebase"
        component={Rebase}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;