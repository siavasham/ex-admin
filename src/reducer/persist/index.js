import { useReducer } from 'react';

import usePersistedReducer from './usePersistedReducer';
import createStorage from './createStorage';

const createPersistedReducer = (key, provider) => {
  if (provider) {
    const storage = createStorage(provider);
    return (reducer, initialState, init) =>
      usePersistedReducer(reducer, initialState, init, key, storage);
  }
  return useReducer;
};

export default createPersistedReducer;
