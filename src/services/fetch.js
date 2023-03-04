import constant from './constant';

const getDirect = async (url = constant.restaurantRentList, options = {}) => {
  try {
    const response = await fetch(constant.baseUrl + url);
    const json = await response.json();
    return {json, header: response?.headers};
  } catch (error) {
    console.error(error);
  }
};

export default {
  getDirect,
};
