import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "assets/styles/app.scss";
import AppRoutes from "Routes";
import Sidebar from "component/sidebar";
import Navbar from "component/navbar";
// import SettingsPanel from "app/shared/SettingsPanel";
import Footer from "component/footer";
import useStorage from "reducer";
import { t } from "locales";

const App = (props) => {
  const { setSetting } = useStorage();
  const [state, setState] = useState({});
  const location = useLocation();
  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("rtl");
    // body.classList.remove("rtl");
    // i18n.changeLanguage("en");
    window.addEventListener("message", (event) => {
      if (event?.data?.login) {
        setSetting(null);
      }
    });
    window.scrollTo(0, 0);
    document.title = t("title");
  }, []);
  useEffect(() => {
    const body = document.querySelector("body");
    const fullPageLayoutRoutes = [
      "/login",
      "/activate",
      "/register",
      "/forget",
      "/error-404",
      "/error-500",
    ];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (location.pathname === fullPageLayoutRoutes[i]) {
        setState({
          isFullPageLayout: true,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.add("full-page-wrapper");
        break;
      } else {
        setState({
          isFullPageLayout: false,
        });
        document
          .querySelector(".page-body-wrapper")
          .classList.remove("full-page-wrapper");
      }
    }
  }, [location]);

  let navbarComponent = !state.isFullPageLayout ? <Navbar /> : "";
  let sidebarComponent = !state.isFullPageLayout ? <Sidebar /> : "";
  // let SettingsPanelComponent = !state.isFullPageLayout ? <SettingsPanel /> : "";
  let footerComponent = !state.isFullPageLayout ? <Footer /> : "";
  return (
    <div className="container-scroller">
      {navbarComponent}
      <div className="container-fluid page-body-wrapper">
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
            {/* {SettingsPanelComponent} */}
          </div>
          {footerComponent}
        </div>
      </div>
    </div>
  );
};

export default withRouter(App);
