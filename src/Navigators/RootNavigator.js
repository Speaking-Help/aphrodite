import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Components/Home';
import Welcome from '../Components/Welcome';

import RecordingUI from '../Components/BasicText/RecordingUI';

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
        component={RecordingUI}
      />
    </Stack.Navigator>
  );
 }

 export default RootNavigator;