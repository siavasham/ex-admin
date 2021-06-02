import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { get, post } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";
import Input from "component/input";
import Button from "component/button";
import Alert from "react-bootstrap/Alert";
import exactMath from "exact-math";

export default function ({ match }) {
  const coin = match.params.coin ?? null;
  const plan = match.params.plan ?? null;
  const [plans, setPlans] = useState({});
  const [planData, setPlanData] = useState([]);
  const [wallet, setWallet] = useState({});
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({ plan, coin });
  const [submiting, setSubmiting] = useState(false);
  const [result, setResult] = useState(null);

  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    get("plans", { cache: true }).then((res) => {
      if (res?.success) {
        let temp = [];
        let temp2 = {};
        for (let i of res.success) {
          temp.push({
            key: i.id,
            val: t(i.type),
          });
          temp2[i.id] = i;
        }
        setPlans(temp2);
        setPlanData(temp);
      } else {
        setError(true);
      }
    });
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        let temp = [];
        let temp2 = {};
        for (let i of res.success.wallet) {
          temp.push({
            key: i.coin,
            val: i.coin,
          });
          temp2[i.coin] = i;
        }
        onChange("amount", temp2[data?.coin].balance);
        setWallet(temp2);
        setWalletData(temp);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const checkAmount = () => {
    const value = parseFloat(data?.amount);
    if (value > wallet[data?.coin]?.balance || value <= 0) {
      value = wallet[data?.coin]?.balance;
    }
    setData({ ...data, amount: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (data?.amount == 0) return;
    setSubmiting(true);
    post("investing", { ...data, token }).then((res) => {
      setSubmiting(null);
      setResult(res?.success ? "success" : "error");
    });
  };
  return (
    <div>
      <Breadcrumb title={coin} icon="mdi-calculator" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6">
                    <Input
                      name={"planType"}
                      data={planData}
                      value={data?.plan}
                      onChange={(v) => onChange("plan", v)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <Input
                      name={"coinType"}
                      data={walletData}
                      value={data?.coin}
                      onChange={(v) => onChange("coin", v)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <Input
                      name={"amount"}
                      value={data?.amount}
                      onChange={(v) => onChange("amount", v)}
                      onBlur={checkAmount}
                      info={
                        <div
                          className="d-flex justify-content-between cursor-pointer"
                          onClick={() =>
                            onChange("amount", wallet[data?.coin]?.balance)
                          }
                        >
                          <span>{t("investable")}</span>
                          <span>{wallet[data?.coin]?.balance}</span>
                        </div>
                      }
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <Input
                      name={"profit"}
                      value={
                        data?.amount
                          ? exactMath.round(
                              exactMath.div(
                                exactMath.mul(
                                  plans?.[data?.plan]?.profit ?? 1,
                                  parseFloat(data?.amount)
                                ),
                                100
                              ),
                              -6
                            )
                          : 0
                      }
                      disabled
                    />
                  </div>
                </div>
                <Alert variant="success" show={result == "success"}>
                  {t("successInvest")}
                </Alert>
                <Alert variant="danger" show={result == "error"}>
                  {t("errorInvest")}
                </Alert>
                <div className="mt-3">
                  <Button
                    loading={submiting}
                    className="btn btn-info btn-lg font-weight-medium"
                  >
                    {t("startInvest")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
