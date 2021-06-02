import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Button from "component/button";
import Input from "component/input";
import { post } from "library/request";
import useStorage from "reducer";
import _ from "lodash";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";

export default function () {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const {
    setting: { token },
  } = useStorage();
  const [data, setData] = useState({
    title: "",
    text: "",
  });
  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const temp = {};
    if (data.title.length < 5) {
      temp["title"] = "validation.min";
    }
    if (data.text.length < 10) {
      temp["text"] = "validation.min";
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
      post("new-ticket", { ...data, token }).then((res) => {
        setLoading(false);
        if (res.success) {
          setSuccess(true);
          setTimeout(() => {
            history.replace("/ticket");
          }, 1000);
        } else if (res.error) {
          const temp = {};
          for (let i in res.error) {
            temp[i] = [i, res.error[i][0]];
          }
          setError(temp);
        }
      });
    }
  };
  return (
    <div>
      <Breadcrumb title="addTicket" icon="mdi-message-text" />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body auth">
              <h4 className="card-title pb-2">{t("addTicket")}</h4>
              <form className="pt-4" autoComplete="off" onSubmit={onSubmit}>
                <Input
                  name={"tikcktTitle"}
                  value={data?.title}
                  onChange={(v) => onChange("title", v)}
                  error={error?.title}
                />
                <Input
                  name={"tikcktText"}
                  multiLine
                  value={data?.text}
                  onChange={(v) => onChange("text", v)}
                  error={error?.text}
                />
                <Alert variant="success" show={success}>
                  {t("successTicket")}
                </Alert>
                <div className="mt-3">
                  <Button
                    loading={loading}
                    className="btn btn-info font-weight-medium"
                  >
                    {t("submit")}
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
