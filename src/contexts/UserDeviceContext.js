import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { userDeviceReducer } from '../reducers/userDeviceReducer';
import {
  apiUrl,
  GET_USER_DEVICE_HISTORY,
  GET_USER_DEVICE_LIST,
} from './constant';

export const UserDeviceContext = createContext();
const UserDeviceContextProvider = ({ children }) => {
  const [userDeviceState, dispatch] = useReducer(userDeviceReducer, {
    userDevice: null,
    userDevicesList: [],
    userDevicesHistory: [],
    userDeviceLoading: true,
  });
  const getUserDevicesList = async () => {
    try {
      const response = await axios.get(`${apiUrl}/userDevices`);
      if (response.data.success) {
        dispatch({
          type: GET_USER_DEVICE_LIST,
          payload: response.data.userDevicesList,
        });
      }
    } catch (error) {
      dispatch({ type: GET_USER_DEVICE_LIST });
    }
  };
  const getUserDevicesHistory = async () => {
    try {
      const response = await axios.get(`${apiUrl}/userDevices/history`);
      if (response.data.success) {
        dispatch({
          type: GET_USER_DEVICE_HISTORY,
          payload: response.data.userDevicesHistory,
        });
      }
    } catch (error) {
      dispatch({ type: GET_USER_DEVICE_HISTORY });
    }
  };

  const UserDeviceContextData = {
    userDeviceState,
    getUserDevicesList,
    getUserDevicesHistory,
  };

  return (
    <UserDeviceContext.Provider value={UserDeviceContextData}>
      {children}
    </UserDeviceContext.Provider>
  );
};

export default UserDeviceContextProvider;
