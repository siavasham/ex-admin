import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import Input from "component/input";
import Spinner from "component/spinner";
import Alert from "react-bootstrap/Alert";

export default function () {
  const [loading, setLoading] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
    setLoading(true);
    post("profile", { token }).then((data) => {
      setLoading(false);
      if (data.success) {
        setData(data.success);
      }
    });
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    setSubmiting(true);
    post("update-info", { ...data, token }).then((data) => {
      setSubmiting(null);
    });
  };
  return (
    <div className="">
      {loading && <Spinner forDiv />}

      <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <Input name={"name"} value={data?.name} disabled />
          </div>
          <div className="col-12 col-md-6">
            <Input name={"email"} value={data?.email} disabled />
          </div>
          <div className="col-12 col-md-6">
            <Input
              name={"fullname"}
              value={data?.fullname}
              onChange={(v) => onChange("fullname", v)}
            />
          </div>
          <div className="col-12 col-md-6">
            <Input
              name={"tell"}
              value={data?.tell}
              onChange={(v) => onChange("tell", v)}
            />
          </div>
          <div class="col-md-6">
            <Input
              name={"language"}
              data={["en", "fa", "tr", "ar"]}
              value={data?.lang}
              onChange={(v) => onChange("lang", v)}
            />
          </div>
        </div>
        <Alert variant="success" show={submiting === null}>
          {t("successInfo")}
        </Alert>
        <div className="mt-3">
          <Button
            loading={submiting}
            className="btn btn-info btn-lg font-weight-medium"
          >
            {t("update")}
          </Button>
        </div>
      </form>
    </div>
  );
}
