import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import Button from "component/button";
import { post } from "library/request";
import Input from "component/input";
import { validateEmail } from "library/helper";
import _ from "lodash";
import useStorage from "reducer";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const { session, setSession, setSetting } = useStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [resError, setResError] = useState(null);

  const onChange = (name, value) => {
    setSession({ [name]: value });
  };
  const validate = () => {
    const { email = "" } = session;
    const temp = {};
    if (!validateEmail(email)) {
      temp["email"] = "validation.email";
    }
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      const { email } = session;
      post("forget", { email }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          setResError(true);
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
                  name={"email"}
                  value={session?.email}
                  onChange={(v) => onChange("email", v)}
                  error={error?.email}
                />
                <Alert variant="danger" show={resError}>
                  {t("wrongAccount")}
                </Alert>
                <Alert variant="success" show={success}>
                  {t("restEmailSend")}
                </Alert>
                <div className="mt-3">
                  <Button
                    loading={loading}
                    className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn"
                  >
                    {t("recover")}
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  <Link to="/login" className="text-info">
                    {t("login")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
