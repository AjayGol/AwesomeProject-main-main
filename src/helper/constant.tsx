import {Dimensions, Platform} from 'react-native';

const constant = {
  appName: 'Test',
  testUser: 'test@gmail.com',
  /** iphone and android condition */
  isIphoneX: Platform.OS === 'ios' && Dimensions.get('window').height === 812,
  isIOS: Platform.OS === 'ios',
  isiPAD:
    Dimensions.get('window').height / Dimensions.get('window').width < 1.6,
  isIpad:
    Dimensions.get('window').width > 400 &&
    Dimensions.get('window').height / Dimensions.get('window').width < 1.6,
  isANDROID: Platform.OS === 'android',
  screenWidth: Dimensions.get('window').width,
  screenHeight:
    (Platform.OS === 'ios' && Dimensions.get('window').height) ||
    Dimensions.get('window').height - 24,

  splashScreenGradient: ['#000000E6', '#000000CC'],
  colorText: '#FFF',
  colorDetail: '#000',
  colorGray: '#24273780',
  progressBarFill: '#04C1D5',
  progressBarUnFill: '#F6F6F6',
};
export default constant;
