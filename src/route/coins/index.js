import React, {lazy } from "react";
import { Switch, Route, } from "react-router-dom";

const route = [
    { path: "/coins/network", component: lazy(() => import("./network")) },
    { path: "/coins/asset", component: lazy(() => import("./asset")) },
    { path: "/coins/pair", component: lazy(() => import("./pair")) },
];
const AppRoutes = (props) => {
  return (
      <>
        {route.map((route, i) => (
          <Route key={i} exact path={route.path} component={route.component} />
        ))}
      </>
  );
};

export default AppRoutes;
