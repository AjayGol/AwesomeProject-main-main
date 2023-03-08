import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import io from 'socket.io-client';
import {useNavigation} from '@react-navigation/native';
import stylesGlobal from '../../helper/globalStyle';
import Constant from '../../helper/constant';

const socket = io(
  Constant.isIOS ? 'http://localhost:4000' : 'http://10.0.2.2:4000',
);

export default function FeedScreen() {
  const navigation: any = useNavigation();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    socket.on('roomsList', rooms => {
      setListData(rooms);
    });
    getTeamList().then(r => () => {
      console.error('#333');
    });
  }, []);

  const getTeamList = () => {
    return fetch(
      Constant.isIOS ? 'http://localhost:4000/api' : 'http://10.0.2.2:4000/api',
    )
      .then(response => response.json())
      .then(json => {
        setListData(json);
        return true;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const onCreateRoom = async () => {
    navigation.navigate('CreateRoom', {socket});
  };

  const onPressRoomDetail = item => {
    navigation.navigate('RoomDetail', {data: item, socket});
  };

  const {
    header,
    headerText,
    createRoomText,
    roomContainer,
    roomImage,
    roomText,
    detailFont,
    marginTextContainer,
  } = styles;
  const renderHeader = () => {
    return (
      <View style={header}>
        <Text style={headerText}>Chat</Text>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={onCreateRoom}>
          <Text style={createRoomText}>Create Room</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={stylesGlobal.flexContainer}>
      <View style={stylesGlobal.flexFull}>
        {renderHeader()}
        <ScrollView style={stylesGlobal.flexFull}>
          {listData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onPressRoomDetail(item)}
                style={roomContainer}>
                <View style={{flexDirection: 'row'}}>
                  <View style={roomImage} />
                  <View style={marginTextContainer}>
                    <Text style={roomText}>{item.name}</Text>
                    {(item?.messages.length > 0 && (
                      <Text style={detailFont}>
                        {item?.messages[item?.messages.length - 1].text}
                      </Text>
                    )) || <Text style={detailFont}>Tap to start chatting</Text>}
                  </View>
                  <View style={stylesGlobal.flexFull} />
                  <View style={{justifyContent: 'center'}}>
                    {(item?.messages.length > 0 && (
                      <Text style={detailFont}>
                        {item?.messages[item?.messages.length - 1].time}
                      </Text>
                    )) || <Text style={detailFont}>Now</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 15,
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  headerText: {fontSize: 25, fontWeight: '700', color: '#2A7B0A'},
  createRoomText: {fontSize: 20, fontWeight: '700', color: '#2A7B0A'},
  roomContainer: {
    margin: 10,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  },
  roomText: {fontSize: 20},
  marginTextContainer: {marginLeft: 10},
  detailFont: {fontSize: 14, color: 'gray'},
  timeValue: {justifyContent: 'center'},
});
