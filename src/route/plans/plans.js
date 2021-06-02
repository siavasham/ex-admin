import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { get, post } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";
import Detail from "./detail";

export default function () {
  const [plans, setPlans] = useState([]);
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState({});
  const [price, setPrice] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [active, setActive] = useState("BTC");
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    get("plans", { cache: true }).then((res) => {
      if (res?.success) {
        setPlans(res.success);
      } else {
        setError(true);
      }
    });
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        let temp = {};
        for (let i of res.success.wallet) {
          temp[i.coin] = i;
        }
        setWallet(temp);
        setCoins(res.success.coins);
        let temp2 = {};
        for (let i of res.success.coins) {
          temp2[i.name] = i.price;
        }
        setPrice(temp2);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="plans" icon="mdi-calculator" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      {plans.length > 0 && (
        <>
          <InfoBox title={t("pickPlan")} text={t("pickDesc")} />
          <ul className="nav nav-pills nav-pills-custom">
            {coins?.map((coin, i) => (
              <li className="nav-item" key={i}>
                <button
                  type="button"
                  onClick={() => setActive(coin.name)}
                  className={
                    "mb-2 btn " +
                    (active == coin.name
                      ? "btn-outline-danger"
                      : "btn-outline-light")
                  }
                >
                  {coin.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="row">
            <div className="col-12">
              <div className="row pricing-table">
                {plans.map((plan, i) => (
                  <Detail
                    plan={plan}
                    amount={price?.[active]}
                    wallet={wallet?.[active] ?? null}
                    coin={active}
                    index={i}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
