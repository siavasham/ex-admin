import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Spinner from "component/spinner";
import Alert from "react-bootstrap/Alert";
import _ from "lodash";

export default function () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const {
    setting: { token },
  } = useStorage();
  const validate = () => {
    const temp = {};
    if (data.newPassword != data.rePassword) {
      temp["rePassword"] = "passwordNotMatch";
    }
    for (let i in data) {
      if (data[i].length < 5) temp[i] = "validation.min";
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
      post("change-password", { ...data, token }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          const temp = {};
          for (let i in data.error) {
            temp[i] = [i, data.error[i][0]];
          }
          setError(temp);
        }
      });
    }
  };
  return (
    <div className="">
      <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <Input
              type="password"
              name={"oldPassword"}
              value={data?.oldPassword}
              onChange={(v) => onChange("oldPassword", v)}
              error={error?.oldPassword}
            />
          </div>
          <div className="col-12 col-md-6"></div>
          <div className="col-12 col-md-6">
            <Input
              type="password"
              name={"newPassword"}
              value={data?.newPassword}
              onChange={(v) => onChange("newPassword", v)}
              error={error?.newPassword}
            />
          </div>
          <div className="col-12 col-md-6">
            <Input
              type="password"
              name={"reNewPassword"}
              value={data?.rePassword}
              onChange={(v) => onChange("rePassword", v)}
              error={error?.rePassword}
            />
          </div>
        </div>
        <Alert variant="success" show={success}>
          {t("successPassword")}
        </Alert>
        <div className="mt-3">
          <Button
            loading={loading}
            className="btn btn-info btn-lg font-weight-medium"
          >
            {t("update")}
          </Button>
        </div>
      </form>
    </div>
  );
}
