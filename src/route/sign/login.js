import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import Button from "component/button";
import { post } from "library/request";
import Input from "component/input";
import _ from "lodash";
import useStorage from "reducer";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const { session, setSession, setSetting } = useStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [resError, setResError] = useState(null);

  const onChange = (name, value) => {
    setSession({ [name]: value });
  };
  const validate = () => {
    const { username = "", password = "" } = session;
    const temp = {};
    if (password.length < 5) {
      temp["password"] = "validation.min";
    }
    for (let i of [username, password]) {
      if (i == "") temp[i] = "validation.empty";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      const { username, password } = session;
      post("login", { username, password }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSetting({ login: data.success });
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
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-md-7 col-lg-6 mx-auto box-max">
            <div className="auth-form-light  py-4 px-4 px-sm-5">
              <div className="brand-logo text-center">
                <img src={require("assets/images/logo.png")} alt="logo" />
              </div>
              {/* <h4>{t("login")}</h4> */}
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <Input
                  name={"username"}
                  value={session?.username}
                  onChange={(v) => onChange("username", v)}
                  error={error?.username}
                />
                <Input
                  type="password"
                  name={"password"}
                  value={session?.password}
                  onChange={(v) => onChange("password", v)}
                  error={error?.password}
                />
                <Alert variant="danger" show={!!resError}>
                  {t(resError)}
                </Alert>
                <div className="mt-3">
                  <Button
                    loading={loading}
                    className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn"
                  >
                    {t("login")}
                  </Button>
                </div>
                {/* <div className="text-center mt-4">
                  <Link to="/forget" className="text-danger">
                    {t("forgetPassword")}
                  </Link>
                </div> */}
                {/* <div className="text-center mt-4 font-weight-light">
                  {t("dontHaveAccount")}{" "}
                  <Link to="/register" className="text-info">
                    {t("createAccount")}
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
