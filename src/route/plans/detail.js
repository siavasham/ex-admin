import React, { useState, useEffect } from "react";
import { t } from "locales";
import exactMath from "exact-math";
import Button from "component/button";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";

const type = ["danger", "info", "success", "light", "primary"];

export default function ({ plan, amount = 0, wallet, index, coin }) {
  const [noBalance, setNoBalance] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setNoBalance(false);
  }, [coin]);
  const onClick = () => {
    if (noBalance) {
      history.push("/wallet/" + coin);
    } else {
      if (wallet?.balance > 0) {
        history.push("/plans/" + coin + "/" + plan.id);
      } else setNoBalance(true);
    }
  };
  return (
    <>
      <div className=" col-sm-6  col-md-4 grid-margin stretch-card pricing-card">
        <div
          className={"card border-" + type[index] + " border pricing-card-body"}
        >
          <div className="text-center pricing-card-head">
            <h2>{t(plan.type)}</h2>
          </div>
          <ul className="list-unstyled plan-features  p-3">
            <li>
              {t("planProfit")}
              <h4 className="float-left font-weight-bold">
                % {t(plan.profit)}
              </h4>
            </li>
            <li>
              {t("planInvest")}
              <h4 className="float-left font-weight-bold text-success">
                <i className="mdi mdi-arrow-up"></i>
                {amount
                  ? exactMath.round(exactMath.div(plan.invest, amount), -3)
                  : amount}
              </h4>
            </li>
            <li className="d-flex justify-content-between  w-100">
              {t("planCancelable")}
              <span className="font-weight-bold">
                <label
                  className={
                    "badge " +
                    (plan.cancelable ? "badge-success" : "badge-danger")
                  }
                >
                  {t(plan.cancelable ? "yes" : "no")}
                </label>
              </span>
            </li>
          </ul>
          <div className="inline-absolute center text-center">
            <Alert
              variant="warning"
              bsPrefix="alert alert-fill"
              show={noBalance}
            >
              {t("noBalanceDoDeposit")}
            </Alert>
          </div>
          <div className="wrapper">
            <Button
              onClick={onClick}
              className={"btn btn-outline-" + type[index] + " btn-block"}
            >
              {t(noBalance ? "deposit" : "start")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
