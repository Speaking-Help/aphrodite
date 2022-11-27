import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import FirstScreen from '../Components/FirstScreen/FirstScreen';
import Practice from '../Components/Practice/Practice';
import Picker from '../Components/NavScreen/Picker';
import ChatScreen from '../Components/Chatbot/ChatScreen';
import Rebase from '../Components/Rebase/Rebase';
import Register from '../Components/Auth/Register';


/**
 * Custom screen navigator
 */
const Stack = createStackNavigator();

/**
 * Navigator for all screens in the app.
 * Structure is as follows. FirstScreen -> PickingScreen -> (Chat or Practice Screen)
 * RebaseScreen exists as a modal on PickingScreen.
 */
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FirstScreen">
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screens
        name="PickingScreen"
        component={Picker}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Practice"
        component={Practice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Rebase"
        component={Rebase}
        options={{ headerShown: false }}
      /><Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;