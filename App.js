import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InputButton from './Components/InputButton/InputButton';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

export default function App() {
  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={ {height: 100}}>
        <Image source={require('./rec.png')}  style={{justifyContent: 'center', alignself: 'center', textAlign: 'center', alignItems: 'center', flex:100, width: 100, height: 120}}/>
    </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteView: {
      flex: 1,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
  },
  btn: {
  }
});