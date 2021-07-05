import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import { post } from "library/request";
import _ from "lodash";
import OtpInput from "component/otp-input";
import Button from "component/button";
import { numEn , handleError } from "library/helper";
import useStorage from "reducer";
import Alert from "react-bootstrap/Alert";

const Activate = () => {
  const { session,setSession, setSetting } = useStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");

  const validate = () => {
    const inputs = { code };
    const temp = {};
    if (code.length < 6) {
      temp["code"] = "validation min";
    }
    const res = _.isEmpty(temp) ? null : temp["code"];
    setError(res);
    return res;
  };
  const reSend = (e) => {
    e.preventDefault();
    const { email, password } = session;
    post("login", {  email, password }).then((res) => {
      if (res.message == 'Success') {
        setSession({ token: res.data.token });
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      post("login-verify", { token: session.token, code }).then((res) => {
        setLoading(false);
        if (res.message == 'Success') {
          setSetting({ login: res.data });
          history.push('/activate')
        } else {
          setError(handleError(res.data));
        }
      });
    }
  };
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-md-7 col-lg-6 mx-auto box-max">
            <div className="auth-form-light neo py-4 px-4 px-sm-5">
              <div className="brand-logo text-center">
                <img src={require("assets/images/logo.png")} alt="logo" />
              </div>
              {/* <h4>{t("code")}</h4> */}
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <p>{t("Two Step Verification")}</p>
                <div className="mt-5 mb-5 dir-ltr align-content-center">
                  <OtpInput
                    value={code}
                    onChange={(val) => setCode(numEn(val))}
                    numInputs={6}
                    isInputNum={true}
                    inputStyle={"form-control"}
                    containerStyle={"justify-content-center"}
                    separator={<span>-</span>}
                  />
                </div>
                <Alert variant="danger" show={!!error}>
                  {t(error)}
                </Alert>
                <div className="mt-5">
                  <Button
                    loading={loading}
                    className="btn btn-block btn-info btn-lg font-weight-medium auth-form-btn"
                  >
                    {t("login")}
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  {t("dont get code ? ")}{" "}
                  <a href="#" className="text-success" onClick={reSend}>
                    {t("resend")}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;
