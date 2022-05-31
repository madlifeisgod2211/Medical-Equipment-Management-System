export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:5000/api'
    : 'https://smartbag-server-new.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'user';
/////////////
export const ITEMS_LOADED_SUCCESS = 'ITEMS_LOADED_SUCCESS';
export const ITEMS_LOADED_FAIL = 'ITEMS_LOADED_FAIL';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const FIND_ITEM = 'FIND_ITEM';
export const PARAMETERS_LOADED_SUCCESS = 'PARAMETERS_LOADED_SUCCESS';
export const PARAMETERS_LOADED_FAIL = 'PARAMETERS_LOADED_FAIL';
export const GET_USER_DEVICE_HISTORY = 'GET_USER_DEVICE_HISTORY';
export const GET_USER_DEVICE_LIST = 'GET_USER_DEVICE_LIST';
export const GET_ITEM_RFID_TAGS_SUCCESS = 'GET_ITEM_RFID_TAGS_SUCCESS';
export const GET_ITEM_RFID_TAGS_FAIL = 'GET_ITEM_RFID_TAGS_FAIL';
