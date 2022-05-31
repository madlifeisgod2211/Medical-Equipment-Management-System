import React, { createContext, useReducer, useState } from 'react';
import axios from 'axios';
import { itemReducer } from '../reducers/itemReducer';
import {
  apiUrl,
  ADD_ITEM,
  ITEMS_LOADED_SUCCESS,
  ITEMS_LOADED_FAIL,
  DELETE_ITEM,
  UPDATE_ITEM,
  FIND_ITEM,
  GET_ITEM_RFID_TAGS_SUCCESS,
  GET_ITEM_RFID_TAGS_FAIL,
} from './constant';
export const ItemContext = createContext();

const ItemContextProvider = ({ children }) => {
  const [itemState, dispatch] = useReducer(itemReducer, {
    item: null,
    items: [],
    itemLoading: true,
  });

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showUpdateItemModal, setShowUpdateItemModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  });

  const checkRfidTags = async () => {
    try {
      const response = await axios.get(`${apiUrl}/rfidTags`);
      if (response.data.success) {
        dispatch({
          type: GET_ITEM_RFID_TAGS_SUCCESS,
          payload: response.data.items,
        });
      }
    } catch (error) {
      dispatch({ type: GET_ITEM_RFID_TAGS_FAIL });
    }
  };

  const addItem = async newItem => {
    try {
      const response = await axios.post(`${apiUrl}/items`, newItem);
      if (response.data.success) {
        dispatch({ type: ADD_ITEM, payload: response.data.item });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  //Load post
  const getItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items`);
      if (response.data.success) {
        dispatch({ type: ITEMS_LOADED_SUCCESS, payload: response.data.items });
      }
    } catch (error) {
      dispatch({ type: ITEMS_LOADED_FAIL });
    }
  };

  //Delete item
  const deleteItem = async itemId => {
    try {
      const response = await axios.delete(`${apiUrl}/items/${itemId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_ITEM, payload: itemId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update item
  const updateItem = async updatedItem => {
    try {
      const response = await axios.put(
        `${apiUrl}/items/${updatedItem.id}`,
        updatedItem
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_ITEM, payload: response.data.item });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  //Find post
  const findItem = itemId => {
    const item = itemState.items.find(item => item.id === itemId);
    dispatch({ type: FIND_ITEM, payload: item });
  };

  const ItemContextData = {
    itemState,
    addItem,
    checkRfidTags,
    getItems,
    deleteItem,
    updateItem,
    findItem,
    setShowAddItemModal,
    showAddItemModal,
    setShowUpdateItemModal,
    showUpdateItemModal,
    showToast,
    setShowToast,
  };

  return (
    <ItemContext.Provider value={ItemContextData}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;
