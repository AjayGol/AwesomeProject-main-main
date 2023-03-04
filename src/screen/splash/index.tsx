import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const {container} = styles;
  const navigation: any = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        global.userName = user;
        navigation.navigate('Feed', {});
      } else {
        navigation.navigate('Login', {});
      }
    });
  }, []);

  return <View style={container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
