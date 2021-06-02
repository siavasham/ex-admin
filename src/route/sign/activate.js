import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { t } from "locales";
import { post } from "library/request";
import _ from "lodash";
import OtpInput from "component/otp-input";
import Button from "component/button";
import { numEn } from "library/helper";
import useStorage from "reducer";
import Alert from "react-bootstrap/Alert";

const Activate = () => {
  const { session, setSetting } = useStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");

  const validate = () => {
    const inputs = { code };
    const temp = {};
    if (code.length < 6) {
      temp["code"] = "validation.min";
    }
    const res = _.isEmpty(temp) ? null : temp["code"];
    setError(res);
    return res;
  };
  const reSend = (e) => {
    e.preventDefault();
    const { name, email, password, referral } = session;
    post("auth", { name, email, password, referral }).then((data) => {
      if (data.success) {
      } else if (data.error) {
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      post("activate", { email: session.email, code }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSetting({ login: data.success });
        } else if (data.error) {
          setError(data.error);
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
              {/* <h4>{t("code")}</h4> */}
              <form className="pt-3" autoComplete="off" onSubmit={onSubmit}>
                <p>{t("codeSendedToEmail")}</p>
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
                    {t("activate")}
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  {t("activateNotSended")}{" "}
                  <a href="#" className="text-success" onClick={reSend}>
                    {t("reSend")}
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
