import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/BasicUtil/Home';
import Welcome from '../Components/FirstScreen/Welcome';
import RecordingUI from '../Components/BasicText/RecordingUI';
import Picker from '../Components/NavScreen/Picker';
import Chatbot from '../Components/Chatbot/Chatbot';
import Rebase from '../Components/Rebase';
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LOGIN">
      <Stack.Screen
        name="LOGIN"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HOME"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RECORDINGUI"
        component={Picker}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Automatic"
        component={RecordingUI}
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