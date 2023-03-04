import request from '../../services/fetch';
import constant from '../../services/constant';

export const homeScreenService = () =>
  request.getDirect(constant.restaurantRentList, {});
