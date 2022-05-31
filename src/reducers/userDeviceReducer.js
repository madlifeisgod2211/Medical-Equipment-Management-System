import {
  GET_USER_DEVICE_HISTORY,
  GET_USER_DEVICE_LIST,
} from '../contexts/constant';

export const userDeviceReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DEVICE_HISTORY:
      return {
        ...state,
        userDevicesHistory: payload,
        userDeviceLoading: false,
      };
    case GET_USER_DEVICE_LIST:
      return { ...state, userDevicesList: payload, userDeviceLoading: false };
    default:
      return state;
  }
};
