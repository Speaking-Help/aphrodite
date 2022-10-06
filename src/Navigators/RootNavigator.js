import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home';
import Welcome from '../Components/Welcome';

import RecordingUI from '../Components/BasicText/RecordingUI';
import Picker from '../Components/Picker';
import Chatbot from '../Components/Chatbot';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LOGIN">
      <Stack.Screen
        name="LOGIN"
        component={Welcome}
        
      />
      <Stack.Screen
        name="HOME"
        component={Home}
      />
      <Stack.Screen
        name="RECORDINGUI"
        component={Picker}
      />
       <Stack.Screen
        name="Automatic"
        component={RecordingUI}
      />
       <Stack.Screen
        name="Chat"
        component={Chatbot}
      />
    </Stack.Navigator>
  );
 }

 export default RootNavigator;