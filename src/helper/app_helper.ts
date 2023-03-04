import constant from './constant';

export function validatorEmail(email) {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return emailPattern.test(email);
}

export function fontSizeManage(size = 15) {
  return size * (constant.screenWidth / 450);
}

export function fontManage(type = 'default') {
  switch (type) {
    case 'default':
      return {
        fontSize: fontSizeManage(),
        fontWeight: '400',
      };
    case 'bold':
      return {
        fontSize: fontSizeManage(),
        fontWeight: '700',
      };
    default:
      break;
  }
  return {};
}
