const createStorage = (provider) => ({
  get(key, initialState) {
    const json = provider.getItem(key);
    const ret = (json === null || json == 'undefined')
      ? typeof initialState === 'function'
        ? initialState()
        : initialState
      : JSON.parse(json);
    return ret;
  },
  set(key, value) {
    provider.setItem(key, JSON.stringify(value));
  },
});

export default createStorage;
