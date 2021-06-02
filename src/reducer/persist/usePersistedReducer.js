import React, { useEffect, useState, useReducer } from 'react';
import useReducerWithThunk from './useReducerWithThunk';

const usePersistedReducer = (reducer, initialState, init, key, storage) => {
  // const [state, dispatch] = useReducerWithThunk(reducer, storage.get(key, initialState), key);
  const [state, dispatch] = useReducer(reducer, storage.get(key, initialState), init);
  useEffect(() => {
    storage.set(key, state);
  }, [state]);

  return [state, dispatch];
};
export default usePersistedReducer;
