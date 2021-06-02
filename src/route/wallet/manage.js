import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";
import Withdraw from "./withdraw";
import Deposit from "./deposit";
import Donut from "./donut";
import exactMath from "exact-math";

const list = [
  { text: "deposit", icon: "mdi-bank", type: "success" },
  { text: "freezed", icon: "mdi-shield-outline", type: "danger" },
  { text: "profit", icon: "mdi-diamond-outline", type: "success" },
  { text: "referral", icon: "mdi-reply", type: "success" },
];
export default function ({ match }) {
  const coin = match.params.coin ?? null;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("wallet-coin", { token, coin }).then((res) => {
      setLoading(false);
      if (res?.success) {
        setData(res.success);
      } else {
        setError(true);
      }
    });
  }, []);

  if (error) return <InfoBox title={t("noData")} />;
  if (loading) return <Spinner forDiv />;
  if (data == null) return null;

  // const withdrawable = exactMath.sub(
  //   exactMath.add(
  //     data?.wallet?.balance ?? 0,
  //     data?.wallet?.profit ?? 0,
  //     data?.wallet?.referral ?? 0
  //   ),
  //   data?.wallet?.freezed ?? 0
  // );

  return (
    <div>
      <Breadcrumb title={coin} icon="mdi-wallet" />
      <div className="row">
        <div
          className={
            " grid-margin stretch-card " +
            (data?.wallet.balance > 0
              ? "col-lg-7 col-md-7 col-sm-12"
              : "col-12")
          }
        >
          <div className="card">
            <div className="card-body">
              <Tab.Container defaultActiveKey="deposit">
                <Nav
                  variant="pills"
                  className="tickets-tab-switch border-bottom"
                >
                  <Nav.Item className="nowrap">
                    <Nav.Link eventKey="deposit">{t("deposit")}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nowrap">
                    <Nav.Link eventKey="withdraw">{t("withdraw")}</Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="border-0 tab-content-basic position-relative">
                  <Tab.Pane eventKey="deposit">
                    <Deposit
                      coin={coin}
                      address={data?.wallet?.address ?? "-"}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="withdraw">
                    <Withdraw coin={coin} balance={data?.wallet?.balance} />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
        {data?.wallet.balance > 0 && (
          <div className="col-lg-5 col-md-5 col-sm-12 grid-margin stretch-card">
            <Donut wallet={data?.wallet} />
          </div>
        )}
        <div className="col-12 grid-margin">
          <div className="card card-statistics">
            <div className="row">
              {list.map((item, i) => (
                <div
                  key={i}
                  className="card-col col-xl-3 col-lg-3 col-md-3 col-6"
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                      <i
                        className={
                          "mdi " + item.icon + " text-primary mx-2 icon-lg"
                        }
                      ></i>
                      <div className="wrapper text-center">
                        <p className="card-text mb-2">{t(item.text)}</p>
                        <div className="fluid-container">
                          <h2
                            className={
                              "mb-0 font-weight-medium text-" + item.type
                            }
                          >
                            {data?.wallet?.[item.text]}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="card-col col-xl-3 col-lg-3 col-md-3 col-6">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-center flex-column flex-sm-row">
                    <i className="mdi mdi-upload text-primary mx-4 icon-lg"></i>
                    <div className="wrapper text-center">
                      <p className="card-text mb-2">{t("withdrawable")}</p>
                      <div className="fluid-container">
                        <h2 className="mb-0 font-weight-medium text-success">
                          {withdrawable}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
