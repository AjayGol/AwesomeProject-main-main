import React from 'react';
import {StyleSheet, View} from 'react-native';

function SplashComponent() {
  const {container} = styles;

  return <View style={container} />;
}

export default SplashComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
