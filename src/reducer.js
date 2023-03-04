import {combineReducers} from 'redux';
import AccountReducer, {initStateAccount} from './modules/account/reducer';

export const appDefaultReducer = {
  user: initStateAccount,
};

const appReducer = combineReducers({
  account: AccountReducer,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  if (action.type === 'RESET_STORE') {
    finalState = appDefaultReducer; // resetReducer(finalState, action);
  }
  return finalState;
}
