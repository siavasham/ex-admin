import React, { useState, useEffect } from "react";
import { t } from "locales";
import { toMoney } from "library/helper";
import useStorage from "reducer";
import { Link } from "react-router-dom";
import exactMath from "exact-math";

export default function ({ coin, wallet, onData }) {
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {}, []);
  return (
    <div className="card card-statistics">
      <div className="card-body">
        <div className="d-flex  justify-content-between">
          <div className="">
            <div className={"coin " + coin.name} />
          </div>
          <div className="">
            <p className="mb-3 text-left ">{coin.fullname}</p>
            <div className="d-flex align-items-center justify-content-between">
              <p className="text-muted mb-0">
                {toMoney(exactMath.mul(wallet.balance ?? 0, coin.price))}
                <i className="mdi mdi-currency-usd text-primary"></i>
              </p>
              <h3 className="font-weight-medium text-left  mb-0  mr-3">
                {wallet.balance ?? 0}
              </h3>
            </div>
          </div>
        </div>
        <div className="d-flex mt-5">
          <Link
            to={"wallet/" + coin.name}
            className="btn btn-outline-primary btn-block"
          >
            {t("deposit")} {wallet.balance > 0 && " / " + t("withdraw")}
          </Link>
        </div>
      </div>
    </div>
  );
}
