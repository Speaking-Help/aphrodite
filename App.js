import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

import RootNavigator from './src/Navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';



export default function App() {  
  
  const theme = extendTheme({
    components: {
      FormControlLabel: {
        baseStyle: {
          justifyContent: 'center',
          _text: {
            fontSize: 'lg',
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
        }
      }
    }
  });

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
  };
  

  return (
    <NativeBaseProvider config={config} theme={theme}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}