import {
  ADD_ITEM,
  DELETE_ITEM,
  FIND_ITEM,
  ITEMS_LOADED_FAIL,
  ITEMS_LOADED_SUCCESS,
  UPDATE_ITEM,
  GET_ITEM_RFID_TAGS_SUCCESS,
  GET_ITEM_RFID_TAGS_FAIL,
} from '../contexts/constant';

export const itemReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ITEMS_LOADED_SUCCESS:
      return { ...state, items: payload, itemLoading: false };
    case ITEMS_LOADED_FAIL:
      return { ...state, items: [], itemLoading: false };
    case ADD_ITEM:
      return { ...state, items: [...state.items, payload] };
    case FIND_ITEM:
      return { ...state, item: payload };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload),
      };
    case UPDATE_ITEM:
      const updateItem = state.items.map(item =>
        item.id === payload.id ? payload : item
      );
      return { ...state, items: updateItem };
    case GET_ITEM_RFID_TAGS_SUCCESS:
      return { ...state, items: payload };
    case GET_ITEM_RFID_TAGS_FAIL:
      return { ...state, items: [] };
    default:
      return state;
  }
};
