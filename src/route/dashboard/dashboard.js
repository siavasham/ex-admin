import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import { toMoney } from "library/helper";
import exactMath from "exact-math";
import { Link } from "react-router-dom";
import Spinner from "component/spinner";

const types = {
  open: "badge-gradient-success",
  progress: "badge-gradient-warning",
  "on-hold": "badge-gradient-info",
  done: "badge-gradient-dark",
  rejected: "badge-gradient-danger",
};

export default function () {
  const [tickets, setTickets] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("tickets", { token }, { cache: true }).then((res) => {
      if (res?.success) {
        setTickets(res.success);
      }
    });
    post("statistics", { token }, { cache: true }).then((res) => {
      setLoading(false);
      if (res?.success) {
        let temp = {};
        for (let i in res.success) {
          temp[i] = exactMath.round(res.success[i], 1);
        }
        setStatistics(temp);
      }
    });
  }, []);
  let sum = statistics?.deposit + statistics?.profit + statistics?.referral;
  if (loading) return <Spinner forDiv />;
  return (
    <div>
      <Breadcrumb title="dashboard" icon="mdi-home" />
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-primary card-img-holder text-white overflow-hidden">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalInvest")}{" "}
                <i className="mdi  mdi-import mdi-24px float-left"></i>
              </h4>
              <h2 className="mb-5">$ {toMoney(statistics?.deposit)}</h2>
              <Link to="/wallet">
                <h6 className="card-text text-black">{t("incAmount")}</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card  bg-gradient-success card-img-holder text-white  overflow-hidden">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalProfit")}{" "}
                <i className="mdi mdi-diamond-outline mdi-24px float-left"></i>
              </h4>
              <h2 className="mb-5">$ {toMoney(statistics?.profit)}</h2>
              <Link to="/plans">
                <h6 className="card-text text-black">{t("startInvesting")}</h6>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white  overflow-hidden">
            <div className="card-body">
              <img
                src={require("assets/images/dashboard/circle.svg")}
                className="card-img-absolute"
                alt="circle"
              />
              <h4 className="font-weight-normal mb-3">
                {t("totalReferrals")}{" "}
                <i className="mdi mdi-reply mdi-24px float-left"></i>
              </h4>
              <h2 className="mb-5">$ {toMoney(statistics?.referral)}</h2>
              <Link to="/referral">
                <h6 className="card-text text-black">{t("inviteFirends")}</h6>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{t("atGlance")}</h4>
              <div className="multi-graph mx-auto">
                <div
                  className="graph"
                  data={t("totalInvest")}
                  style={{
                    "--percentage": Math.round(
                      (statistics?.deposit / sum) * 100
                    ),
                    "--fill": "#b66dff",
                  }}
                ></div>
                <div
                  className="graph"
                  data={t("totalProfit")}
                  style={{
                    "--percentage": Math.round(
                      (statistics?.profit / sum) * 100
                    ),
                    "--fill": "#00b050",
                  }}
                ></div>
                <div
                  className="graph"
                  data={t("totalReferrals")}
                  style={{
                    "--percentage": Math.round(
                      (statistics?.referral / sum) * 100
                    ),
                    "--fill": "#fe7c96",
                  }}
                ></div>
              </div>
              <div className="rounded-legend legend-vertical legend-bottom-left pt-4 ">
                <ul className="row ">
                  <li className="col-4 text-center">
                    <span className="legend-dots bg-info"></span>
                    {t("invest")}
                  </li>
                  <li className="col-4 text-center">
                    <span className="legend-dots bg-success"></span>
                    {t("profit")}
                  </li>
                  <li className="col-4 text-center">
                    <span className="legend-dots bg-danger "></span>
                    {t("referrals")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{t("recentTicket")}</h4>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th> {t("subject")} </th>
                      <th> {t("status")} </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets?.map((ticket, i) => (
                      <tr key={i}>
                        <td>
                          <Link to={"ticket/view/" + ticket.id}>
                            {ticket.title}{" "}
                          </Link>
                        </td>
                        <td>
                          <Link to={"ticket/view/" + ticket.id}>
                            <label className={"badge " + types[ticket.status]}>
                              {t(ticket.status)}
                            </label>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
