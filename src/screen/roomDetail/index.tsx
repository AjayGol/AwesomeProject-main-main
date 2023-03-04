import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Constant from '../../helper/constant';
import stylesGlobal from '../../helper/globalStyle';

function TutorialScreen({route}: any) {
  const navigation: any = useNavigation();
  const [dataGroup] = useState(route?.params?.data || {});
  const [listMessage, setListMessage] = useState([]);
  const [roomText, setRoomText] = useState('');
  const socket = route?.params?.socket;

  const {
    otherUserSubContainer,
    chatText,
    myUserSubContainer,
    otherUserContainer,
    imageProfile,
    myUserContainer,
    sendButtonStyle,
    sendButton,
    headerContainer,
    headerSubContainer,
    textHeader,
    headerContainerMain,
    textInputContainer,
    textInputSubContainer,
    textInputStyle,
    timeContainer,
    leftTime,
  } = styles;

  useEffect(() => {
    socket.emit('findRoom', dataGroup.id);
    socket.on('foundRoom', value => {
      setListMessage(value);
    });
  }, []);

  const onPressGoBack = () => {
    navigation.goBack();
  };

  const onPressCreate = () => {
    if (roomText === '') {
      alert('Please enter room name');
    } else {
      const hour = new Date().getHours();
      const mins = new Date().getMinutes();

      socket.emit('newMessage', {
        message: roomText,
        room_id: dataGroup.id,
        user: global.userName,
        timestamp: {hour, mins},
      });
      setRoomText('');
    }
  };

  const renderHeader = () => {
    return (
      <View style={headerContainer}>
        <View style={headerSubContainer}>
          <Text style={textHeader}>{dataGroup?.name}</Text>
        </View>
        <TouchableOpacity onPress={onPressGoBack}>
          <Text style={textHeader}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderBottom = () => {
    if (Constant.isIOS) {
      return (
        <KeyboardAvoidingView behavior={Constant.isIOS ? 'padding' : 'height'}>
          {renderMainData()}
        </KeyboardAvoidingView>
      );
    }
  };

  const renderMainData = () => {
    return (
      <View style={textInputContainer}>
        <View style={textInputSubContainer}>
          <TextInput
            value={roomText}
            placeholder="Enter room name"
            style={textInputStyle}
            onChangeText={setRoomText}
          />
        </View>
        <TouchableOpacity style={sendButton} onPress={onPressCreate}>
          <Text style={sendButtonStyle}>Send</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesGlobal.flexContainer}>
      <View style={headerContainerMain}>{renderHeader()}</View>

      <ScrollView style={{flex: 1}}>
        {listMessage.map((item, index) => {
          return (
            <View>
              {item.user === global.userName ? (
                <View>
                  <TouchableOpacity style={myUserContainer}>
                    <View style={imageProfile} />
                    <View style={myUserSubContainer}>
                      <Text style={chatText}>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={timeContainer}>
                    <View style={stylesGlobal.flexContainer} />
                    <Text>{item.time}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <TouchableOpacity style={otherUserContainer}>
                    <View style={imageProfile} />
                    <View style={otherUserSubContainer}>
                      <Text style={chatText}>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={leftTime}>
                    <Text>{item.time}</Text>
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {renderBottom()}
    </SafeAreaView>
  );
}

export default TutorialScreen;

const styles = StyleSheet.create({
  headerContainer: {width: '100%'},
  headerSubContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader: {fontSize: 25, fontWeight: '700', color: '#2A7B0A'},
  headerContainerMain: {marginHorizontal: 10},
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  textInputSubContainer: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    flex: 1,
  },
  textInputStyle: {width: '100%', height: 50},
  sendButton: {backgroundColor: '#2A7B0A', padding: 10, borderRadius: 10},
  sendButtonStyle: {fontSize: 20, fontWeight: '700', color: '#FFF'},
  myUserContainer: {
    margin: 10,
    padding: 10,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  imageProfile: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  otherUserContainer: {
    margin: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  myUserSubContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#C1F3C1',
    marginRight: 5,
    maxWidth: Constant.screenWidth * 0.7,
  },
  chatText: {fontSize: 20, padding: 12},
  otherUserSubContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F4CAC0',
    marginRight: 5,
    marginLeft: 5,
    maxWidth: Constant.screenWidth * 0.7,
  },
  timeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 50,
    marginTop: -10,
  },
  leftTime: {
    marginLeft: 53,
    flex: 1,
    flexDirection: 'row',
  },
});
