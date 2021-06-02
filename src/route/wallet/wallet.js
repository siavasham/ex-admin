import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import Coin from "./coin";
import { t } from "locales";
import { post } from "library/request";
import Spinner from "component/spinner";
import InfoBox from "component/infobox";
import useStorage from "reducer";

export default function () {
  const [coins, setCoins] = useState([]);
  const [wallet, setWallet] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("wallet", { token }).then((res) => {
      if (res?.success) {
        let temp = {};
        for (let i of res.success.wallet) {
          temp[i.coin] = i;
        }
        setWallet(temp);
        setCoins(res.success.coins);
      } else {
        setError(true);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Breadcrumb title="wallet" icon="mdi-wallet" />
      {loading && <Spinner forDiv />}
      {error && <InfoBox title={t("noData")} />}
      <div className="row">
        {coins?.map((coin, i) => (
          <div
            key={i}
            className={
              "col-xl-4 col-lg-4 col-md-4 col-sm-6 grid-margin stretch-card"
            }
          >
            <Coin coin={coin} wallet={wallet?.[coin.name] ?? {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
