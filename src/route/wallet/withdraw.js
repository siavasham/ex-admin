import React, { useState, useEffect } from "react";
import Button from "component/button";
import Input from "component/input";
import { post } from "library/request";
import useStorage from "reducer";
import _ from "lodash";
import { t } from "locales";
import Alert from "react-bootstrap/Alert";

export default (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [resError, setResError] = useState(null);

  const {
    setting: { token },
  } = useStorage();
  const [data, setData] = useState({
    address: "",
    amount: "",
  });
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const temp = {};
    if (data.address.length < 5) {
      temp["address"] = "validation.min";
    }
    if (data.amount.length < 1 || data.amount == 0) {
      temp["amount"] = "validation.min";
    }
    for (let i in data) {
      if (data[i] == "") temp[i] = "validation.empty";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      post("withdraw", { ...data, token, coin: props.coin }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          if (typeof data.error == "string") setResError(data.error);
          else {
            const temp = {};
            for (let i in data.error) {
              temp[i] = [i, data.error[i][0]];
            }
            setError(temp);
          }
        }
      });
    }
  };
  return (
    <div className="auth">
      <form autoComplete="off" onSubmit={onSubmit}>
        <Input
          name={"address"}
          value={data?.address}
          onChange={(v) => onChange("address", v)}
          error={error?.address}
        />
        <Input
          name={"amount"}
          value={data?.amount}
          onChange={(v) => onChange("amount", v)}
          error={error?.amount}
          info={
            <div
              className="d-flex justify-content-between cursor-pointer"
              onClick={() => onChange("amount", props.balance)}
            >
              <span>{t("withdrawable")}</span>
              <span>{props.balance}</span>
            </div>
          }
        />
        <Alert variant="success" show={success}>
          {t("withdrawSuccess")}
        </Alert>
        <Alert variant="danger" show={!!resError}>
          {t(resError)}
        </Alert>
        <div className="mt-3">
          <Button
            loading={loading}
            className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn"
          >
            {t("withdrawRequest")}
          </Button>
        </div>
      </form>
    </div>
  );
};
