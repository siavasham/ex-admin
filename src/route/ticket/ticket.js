import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import useTimeAgo from "library/timeAgo";
import useStorage from "reducer";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const types = ["open", "progress", "on-hold", "done", "rejected"];

export default function () {
  const [tickets, setTickets] = useState([]);
  const {
    setting: { token },
  } = useStorage();
  const timeAgo = useTimeAgo();

  useEffect(() => {
    post("tickets", { token }, { cache: true }).then((res) => {
      if (res?.success) {
        const temp = {};
        for (let ticket of res.success) {
          temp[ticket.status] = [...(temp?.[ticket.status] ?? []), ticket];
        }
        setTickets(temp);
      }
    });
  }, []);

  return (
    <div>
      <Breadcrumb title="ticket" icon="mdi-message-text" />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div className="d-sm-flex pb-4 mb-4 border-bottom">
                <Link className="btn btn-gradient-success p-3" to="/ticket/new">
                  {t("addTicket")}
                </Link>
              </div>
              <Tab.Container defaultActiveKey="open">
                <Nav variant="pills" className="tickets-tab-switch">
                  {types.map((type, i) => (
                    <Nav.Item key={i} className="nowrap">
                      <Nav.Link eventKey={type}>
                        {t(type)}
                        <div className="badge">
                          {tickets?.[type]?.length ?? 0}{" "}
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="border-0 tab-content-basic">
                  {types.map((type, i) => (
                    <Tab.Pane eventKey={type} key={i}>
                      {tickets?.[type]?.map((ticket, i) => (
                        <Link key={i} to={"/ticket/view/" + ticket.id}>
                          <div className="row tickets-card">
                            <div className="col d-flex mt-2 mb-2">
                              <div className="nowrap">
                                <p className="tickets-details col-lg-8">
                                  <p className="mb-2 font-weight-medium text-muted">
                                    {t("tikcktTitle")}
                                  </p>
                                  <h6 className="font-weight-semibold mb-0 text-primary">
                                    {ticket.title}
                                  </h6>
                                </p>
                              </div>
                            </div>
                            <div className="ticket-float col-lg-2 col-sm-6">
                              <div className="nowrap">
                                <p className="mb-2 font-weight-medium text-muted">
                                  {t("date")}
                                </p>
                                <span className="font-weight-semibold mb-0">
                                  {timeAgo.format(
                                    new Date(ticket.created_at).getTime()
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
