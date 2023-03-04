import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesGlobal from '../../helper/globalStyle';

export default function LoginScreen() {
  const navigation: any = useNavigation();
  const [name, setName] = useState('');
  const {
    header,
    headerText,
    nameInput,
    textInput,
    textStyle,
    buttonStyle,
    bottomContainer,
  } = styles;

  const renderHeader = () => {
    return (
      <View style={header}>
        <Text style={headerText}>Sign in</Text>
      </View>
    );
  };

  const onPressCreate = async () => {
    if (name === '') {
      alert('Please enter your name');
    } else {
      global.userName = name;
      await AsyncStorage.setItem('user', name);
      navigation.navigate('Feed', {});
    }
  };

  return (
    <SafeAreaView style={stylesGlobal.flexContainer}>
      <View>{renderHeader()}</View>
      <View style={nameInput}>
        <TextInput
          placeholder="Enter your name"
          style={textInput}
          onChangeText={setName}
        />
      </View>
      <View style={bottomContainer}>
        <TouchableOpacity style={buttonStyle} onPress={onPressCreate}>
          <Text style={textStyle}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {width: '100%', alignItems: 'center', marginHorizontal: 10},
  headerText: {fontSize: 20, fontWeight: '700', color: '#000000'},
  nameInput: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '700',
    paddingHorizontal: 30,
    paddingVertical: 5,
    color: '#fff',
  },
  textInput: {width: '100%', height: 50},
  bottomContainer: {
    width: '100%',
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
