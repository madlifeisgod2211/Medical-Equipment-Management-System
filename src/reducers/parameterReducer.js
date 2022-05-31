import {
  PARAMETERS_LOADED_SUCCESS,
  PARAMETERS_LOADED_FAIL,
} from '../contexts/constant';
export const parameterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PARAMETERS_LOADED_SUCCESS:
      return { ...state, parameters: payload };
    case PARAMETERS_LOADED_FAIL:
      return { ...state, parameters: [] };
    default:
      return state;
  }
};
