import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

import RootNavigator from './src/Navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';




export default function App() {


  const [fontsLoaded] = useFonts({
    'Ramm': require('./assets/fonts/RammettoOne-Regular.ttf'),
  });
  
  
  const theme = extendTheme({
    components: {
      FormControlLabel: {
        baseStyle: {
          justifyContent: 'center',
          _text: {
            fontSize: 'lg',
            fontFamily: 'Ramm',
            textAlign: 'center'
          }
        }
      },
      Input: {
        baseStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        }
      },
      Heading: {

        baseStyle: {
          justifyContent: 'center',
          fontFamily: 'Ramm'
        }
      }
    }
  });

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}