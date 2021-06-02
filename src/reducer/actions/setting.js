import createPersistedReducer from "../persist";

export default createPersistedReducer("setting", localStorage);
export const initialState = {
  token: "",
  name: "",
  lang: "fa",
  isLoged: false,
};

export function reducer(state, action) {
  if (action == null) {
    return { ...initialState };
  } else if ("login" in action) {
    return { ...state, ...action.login, isLoged: true };
  } else {
    return { ...state, ...action };
  }
}
