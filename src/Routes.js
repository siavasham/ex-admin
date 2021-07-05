import React, { Suspense, lazy ,useEffect} from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import useStorage from "reducer";
import {constans,getList} from "library/constans";
import Spinner from "component/spinner";

// const news = lazy(() => import("route/news/news"));
// const constans = lazy(() => import("route/setting/constans"));
// const addNews = lazy(() => import("route/news/add"));
// const editNews = lazy(() => import("route/news/edit"));


const route = {
  home: [
    { path: "/dashboard", component: lazy(() => import("route/dashboard/dashboard")) },
    { path: "/users", component:  lazy(() => import("route/users/users")) },
    { path: "/coins/*", component: lazy(() => import("route/coins/index")) },
  ],
  sign: [
    { path: "/login", component: lazy(() => import("route/sign/login")) },
    { path: "/activate", component: lazy(() => import("route/sign/activate")) }
  ],
};
const AppRoutes = (props) => {
  const history = useHistory();
  const location = useLocation();
  const {  setting: { isLoged ,token} , session , setSession} = useStorage();

  const list = route[isLoged ? "home" : "sign"];
  const isRoute = list.find((e) => e.item == location.pathname);

  useEffect(() => {
    if (isLoged) {
      if (!session?.constans) {
        constans(token).then(constans => {
          setSession({constans})
        })
      }
      if (!session?.asset) {
        getList(token,'asset').then(asset => {
          setSession({asset})
        })
      }
      if (!session?.network) {
        getList(token,'network').then(network => {
          setSession({network})
        })
      }
    }
  }, [isLoged]);
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
