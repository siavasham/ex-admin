import React, { useContext } from "react";
import storeContext from "reducer/context";

import settingReducer, {
  reducer as _setSetting,
  initialState as _setting,
} from "reducer/actions/setting";
import appReducer, {
  reducer as _setApp,
  initialState as _app,
} from "reducer/actions/app";
import sessionReducer, {
  reducer as _setSession,
  initialState as _session,
} from "reducer/actions/session";

export default function useStorage() {
  return useContext(storeContext);
}
export const storeContextProvider = (props) => {
  const [setting, setSetting] = settingReducer(_setSetting, _setting);
  const [app, setApp] = appReducer(_setApp, _app);
  const [session, setSession] = sessionReducer(_setSession, _session);

  return (
    <storeContext.Provider
      value={{
        setting,
        setSetting,
        app,
        setApp,
        session,
        setSession,
      }}
    >
      {props.children}
    </storeContext.Provider>
  );
};
