import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import constant from '../helper/constant';
import SlashScreen from '../screen/splash';
import RoomDetailScreen from '../screen/roomDetail';
import FeedScreen from '../screen/feed';
import CreateRoom from '../screen/createRoom';
import Login from '../screen/login';

const Stack =
  (constant.isIOS && createNativeStackNavigator()) ||
  createNativeStackNavigator();

export function Screen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Slash" component={SlashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
      <Stack.Screen name="CreateRoom" component={CreateRoom} />
    </Stack.Navigator>
  );
}
