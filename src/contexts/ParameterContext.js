import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { parameterReducer } from '../reducers/parameterReducer';
import { apiUrl } from './constant';
import { PARAMETERS_LOADED_SUCCESS, PARAMETERS_LOADED_FAIL } from './constant';

export const ParameterContext = createContext(parameterReducer);

const ParameterContextProvider = ({ children }) => {
  const { parameterState, dispatch } = useReducer(parameterReducer, {
    parameters: [],
  });

  //Get all data
  const getParameters = async () => {
    try {
      const response = await axios.get(`${apiUrl}/parameters`);
      if (response.data.success) {
        dispatch({
          type: PARAMETERS_LOADED_SUCCESS,
          payload: response.data.parameters,
        });
      }
    } catch (error) {
      dispatch({ type: PARAMETERS_LOADED_FAIL });
    }
  };
  const ParameterContextData = { parameterState, getParameters };
  return (
    <ParameterContext.Provider value={ParameterContextData}>
      {children}
    </ParameterContext.Provider>
  );
};

export default ParameterContextProvider;
