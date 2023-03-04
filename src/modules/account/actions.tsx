import {homeScreenService} from './services';
import {HOME_LISTING} from './constant';

/**
 * Home screen API
 */
export const homeScreenAPI = () => {
  return (dispatch, getState) => {
    return homeScreenService()
      .then(response => {
        return dispatch({
          type: HOME_LISTING,
          payload: [
            ...response.json.data,
            ...response.json.data,
            ...response.json.data,
          ],
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};
