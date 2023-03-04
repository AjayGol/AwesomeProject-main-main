import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import stylesGlobal from '../../helper/globalStyle';

function CreateRoom({route}: any) {
  const navigation: any = useNavigation();
  const [roomText, setRoomText] = useState('');

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const {
    headerStyle,
    backStyle,
    headerWidth,
    textInputValue,
    textInputStyle,
    footerContainer,
    createText,
  } = styles;
  const renderHeader = () => {
    return (
      <View style={headerStyle}>
        <TouchableOpacity onPress={onPressGoBack}>
          <Text style={backStyle}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressCreate = () => {
    if (roomText === '') {
      alert('Please enter room name');
    } else {
      route?.params?.socket.emit('createRoom', roomText);
      onPressGoBack();
    }
  };

  return (
    <SafeAreaView style={stylesGlobal.flexContainer}>
      <View style={headerWidth}>{renderHeader()}</View>
      <View style={textInputValue}>
        <TextInput
          placeholder="Enter room name"
          style={textInputStyle}
          onChangeText={setRoomText}
        />
      </View>
      <View style={footerContainer}>
        <TouchableOpacity onPress={onPressCreate}>
          <Text style={createText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressGoBack}>
          <Text style={createText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default CreateRoom;

const styles = StyleSheet.create({
  headerStyle: {width: '100%'},
  backStyle: {fontSize: 20, fontWeight: '700', color: '#2A7B0A'},
  headerWidth: {marginHorizontal: 10},
  footerContainer: {
    width: '100%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textInputStyle: {width: '100%', height: 50},
  textInputValue: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  createText: {fontSize: 20, fontWeight: '700', color: '#2A7B0A'},
});
