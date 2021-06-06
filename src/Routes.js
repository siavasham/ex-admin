import React, { Suspense, lazy } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import useStorage from "reducer";
import Spinner from "component/spinner";

const dashboard = lazy(() => import("route/dashboard/dashboard"));
const users = lazy(() => import("route/users/users"));
const coins = lazy(() => import("route/coins/coins"));
const news = lazy(() => import("route/news/news"));
const constans = lazy(() => import("route/setting/constans"));
const addNews = lazy(() => import("route/news/add"));
const editNews = lazy(() => import("route/news/edit"));

const login = lazy(() => import("route/sign/login"));

const route = {
  home: [
    { path: "/dashboard", component: dashboard },
    { path: "/users", component: users },
    { path: "/coins", component: coins },
    { path: "/news", component: news },
    { path: "/setting/constans", component: constans },
    { path: "/news/add", component: addNews },
    { path: "/news/edit", component: editNews },
  ],
  sign: [{ path: "/login", component: login }],
};
const AppRoutes = (props) => {
  const history = useHistory();
  const location = useLocation();
  const {
    setting: { isLoged },
  } = useStorage();
  console.log(isLoged);
  const list = route[isLoged ? "home" : "sign"];
  const isRoute = list.find((e) => e.item == location.pathname);

  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        {list.map((route, i) => (
          <Route key={i} exact path={route.path} component={route.component} />
        ))}
        {!isRoute && <Redirect to={isLoged ? "/dashboard" : "/login"} />}
      </Switch>
    </Suspense>
  );
};

export default AppRoutes;
