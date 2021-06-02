import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import useStorage from "reducer";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Info from "./info";
import Password from "./password";

export default function () {
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {}, []);

  return (
    <div>
      <Breadcrumb title="profile" icon="mdi-account" />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <Tab.Container defaultActiveKey="info">
                <Nav
                  variant="pills"
                  className="tickets-tab-switch border-bottom"
                >
                  <Nav.Item className="nowrap">
                    <Nav.Link eventKey="info">{t("userInformation")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nowrap">
                    <Nav.Link eventKey="password">
                      {t("changePassword")}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="border-0 tab-content-basic position-relative">
                  <Tab.Pane eventKey="info">
                    <Info />
                  </Tab.Pane>
                  <Tab.Pane eventKey="password">
                    <Password />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
