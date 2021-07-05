import React, { useState, useEffect } from "react";
import { withRouter, useLocation, Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { t } from "locales";
import useStorage from "reducer";

const Sidebar = (props) => {
  const {
    setting: { name },
  } = useStorage();
  const [state, setState] = useState({});
  const location = useLocation();

  const toggleMenuState = (menuState) => {
    if (state[menuState]) {
      setState({ [menuState]: false });
    } else if (Object.keys(state).length === 0) {
      setState({ [menuState]: true });
    } else {
      Object.keys(state).forEach((i) => {
        setState({ [i]: false });
      });
      setState({ [menuState]: true });
    }
  };

  useEffect(() => {
    onRouteChanged();
  }, [location]);
  useEffect(() => {
    toggleMenuState(location.pathname.split("/")?.[1] ?? '')
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }, []);

  const onRouteChanged = () => {
    document.querySelector("#sidebar").classList.remove("active");


    // const dropdownPaths = [{ path: "/apps", state: "appsMenuOpen" }];

    // dropdownPaths.forEach((obj) => {
    //   if (isPathActive(obj.path)) {
    //     setState({ [obj.state]: true });
    //   }
    // });
  };
  const isPathActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li
          className={
            isPathActive("/dashboard") ? "nav-item active" : "nav-item"
          }
        >
          <Link className="nav-link" to="/dashboard">
            <span className="menu-title">{t("dashboard")}</span>
            <i className="mdi mdi-home-outline menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/coins") ? "nav-item active" : "nav-item"}
        >
          <div
            className={state.coins ? "nav-link menu-expanded" : "nav-link"}
            onClick={(e) => toggleMenuState("coins")}
            data-toggle="collapse"
          >
            <span className="menu-title">{t("coins")}</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-coin menu-icon"></i>
          </div>
          <Collapse in={state.coins}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                <Link
                  className={ isPathActive("/coins/network") ? "nav-link active": "nav-link"}
                  to="/coins/network"
                >
                  {t("netwoks")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={ isPathActive("/coins/asset") ? "nav-link active": "nav-link"}
                  to="/coins/asset"
                >
                  {t("assets")}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={ isPathActive("/coins/pair") ? "nav-link active": "nav-link"}
                  to="/coins/pair"
                >
                  {t("pairs")}
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        <li className={isPathActive("/users") ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/users">
            <span className="menu-title">{t("users")}</span>
            <i className="mdi mdi mdi-account-multiple-outline menu-icon"></i>
          </Link>
        </li>
        <li className={isPathActive("/news") ? "nav-item active" : "nav-item"}>
          <Link className="nav-link" to="/news">
            <span className="menu-title">{t("news")}</span>
            <i className="mdi mdi mdi-newspaper menu-icon"></i>
          </Link>
        </li>
        {/* <li
          className={isPathActive("/setting") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/setting">
            <span className="menu-title">{t("setting")}</span>
            <i className="mdi mdi-settings menu-icon"></i>
          </Link>
        </li> */}
        <li
          className={isPathActive("/ticket") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/ticket">
            <span className="menu-title">{t("ticket")}</span>
            <i className="mdi mdi-message-text menu-icon"></i>
          </Link>
        </li>
        <li
          className={isPathActive("/candle") ? "nav-item active" : "nav-item"}
        >
          <Link className="nav-link" to="/candle">
            <span className="menu-title">{t("candle")}</span>
            <i className="mdi mdi-chart-line menu-icon"></i>
          </Link>
        </li>

        <li
          className={isPathActive("/setting") ? "nav-item active" : "nav-item"}
        >
          <div
            className={state.setting ? "nav-link menu-expanded" : "nav-link"}
            onClick={() => toggleMenuState("setting")}
            data-toggle="collapse"
          >
            <span className="menu-title">{t("setting")}</span>
            <i className="menu-arrow"></i>
            <i className="mdi mdi-settings menu-icon"></i>
          </div>
          <Collapse in={state.setting}>
            <ul className="nav flex-column sub-menu">
              <li className="nav-item">
                {" "}
                <Link
                  className={
                    isPathActive("/setting/constans")
                      ? "nav-link active"
                      : "nav-link"
                  }
                  to="/setting/constans"
                >
                  {t("constans")}
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
        {/*
          <li
            className={
              isPathActive("/form-elements")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                state.formElementsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("formElementsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Form Elements</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-format-list-bulleted menu-icon"></i>
            </div>
            <Collapse in={state.formElementsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/form-elements/basic-elements")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/form-elements/basic-elements"
                  >
                    <Trans>Basic Elements</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/tables") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.tablesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("tablesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Tables</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-table-large menu-icon"></i>
            </div>
            <Collapse in={state.tablesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/tables/basic-table")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/tables/basic-table"
                  >
                    <Trans>Basic Table</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/icons") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.iconsMenuOpen ? "nav-link menu-expanded" : "nav-link"
              }
              onClick={() => toggleMenuState("iconsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Icons</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-contacts menu-icon"></i>
            </div>
            <Collapse in={state.iconsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/icons/mdi")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/icons/mdi"
                  >
                    <Trans>Material</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/charts") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.chartsMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("chartsMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Charts</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-chart-bar menu-icon"></i>
            </div>
            <Collapse in={state.chartsMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/charts/chart-js")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/charts/chart-js"
                  >
                    <Trans>Chart Js</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/user-pages") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.userPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("userPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>User Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-lock menu-icon"></i>
            </div>
            <Collapse in={state.userPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/login-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/login-1"
                  >
                    <Trans>Login</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/register-1")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/register-1"
                  >
                    <Trans>Register</Trans>
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/user-pages/lockscreen")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/user-pages/lockscreen"
                  >
                    <Trans>Lockscreen</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/error-pages") ? "nav-item active" : "nav-item"
            }
          >
            <div
              className={
                state.errorPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("errorPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>Error Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-security menu-icon"></i>
            </div>
            <Collapse in={state.errorPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-404")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-404"
                  >
                    404
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/error-pages/error-500")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/error-pages/error-500"
                  >
                    500
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li
            className={
              isPathActive("/general-pages")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <div
              className={
                state.generalPagesMenuOpen
                  ? "nav-link menu-expanded"
                  : "nav-link"
              }
              onClick={() => toggleMenuState("generalPagesMenuOpen")}
              data-toggle="collapse"
            >
              <span className="menu-title">
                <Trans>General Pages</Trans>
              </span>
              <i className="menu-arrow"></i>
              <i className="mdi mdi-medical-bag menu-icon"></i>
            </div>
            <Collapse in={state.generalPagesMenuOpen}>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  {" "}
                  <Link
                    className={
                      isPathActive("/general-pages/blank-page")
                        ? "nav-link active"
                        : "nav-link"
                    }
                    to="/general-pages/blank-page"
                  >
                    <Trans>Blank Page</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="http://bootstrapdash.com/demo/purple-react-free/documentation/documentation.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="menu-title">
                <Trans>Documentation</Trans>
              </span>
              <i className="mdi mdi-file-document-box menu-icon"></i>
            </a>
          </li>
         */}
      </ul>
    </nav>
  );
};

export default withRouter(Sidebar);
