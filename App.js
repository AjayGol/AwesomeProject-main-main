import React, {useEffect} from 'react';
import {StyleSheet, View, StatusBar, LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {default as AsyncStorage2} from '@react-native-async-storage/async-storage';
import getStoredStateMigrateV4 from 'redux-persist/lib/integration/getStoredStateMigrateV4';
import SafeArea from 'react-native-safe-area';

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import InitialSplashView from './src/component/Splash';
import AppReducer from './src/reducer';
import {Screen} from './src/navigation/screens';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['Setting a timer']);

// setup navigation
const persistConfig = {
  key: 'root',
  storage,
  getStoredState: getStoredStateMigrateV4({
    blacklist: ['navigation'],
    storage: AsyncStorage2,
  }),
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, AppReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export default function App() {
  const {container} = styles;

  useEffect(() => {
    setSafeArea();
  }, []);

  const setSafeArea = () => {
    SafeArea.getSafeAreaInsetsForRootView().then(result => {
      const temp = {
        top: result.safeAreaInsets.top,
        bottom: result.safeAreaInsets.bottom,
        left: result.safeAreaInsets.left,
        right: result.safeAreaInsets.right,
      };
      global.SafeArea = temp;
    });
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<InitialSplashView />} persistor={persistor}>
        <View style={container}>
          <StatusBar hidden={false} barStyle="light-content" />
          <NavigationContainer>
            <Screen />
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
}
// 9714714057

const styles = StyleSheet.create({
  container: {flex: 1},
});
