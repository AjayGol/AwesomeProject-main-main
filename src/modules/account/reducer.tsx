import {HOME_LISTING} from './constant';

export const initStateAccount = {
  homeList: [],
};

export default (state = initStateAccount, action) => {
  switch (action.type) {
    case HOME_LISTING: {
      return {
        ...state,
        homeList: action.payload || [],
      };
    }

    default:
      return state;
  }
};
