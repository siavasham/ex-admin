import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import InfoBox from "component/infobox";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import useTimeAgo from "library/timeAgo";
import useStorage from "reducer";

export default function () {
  const [referrals, setReferrals] = useState([]);
  const [copid, setCopid] = useState(false);
  const {
    setting: { name, token },
  } = useStorage();
  const timeAgo = useTimeAgo();
  const address = window.location.origin + "/register?ref=" + name;
  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  useEffect(() => {
    post("referrals", { token }, { cache: true }).then((res) => {
      if (res?.success) {
        setReferrals(res.success);
      }
    });
  }, []);
  return (
    <div>
      <Breadcrumb title="referrals" icon="mdi-reply" />
      <InfoBox text={t("referralDesc")} />
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title pb-3">{t("yourReferral")}</h4>
              <p className="card-description">{t("referralHelp")}</p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <label>{t("refLink")}</label>
                  <div className="input-group">
                    <div className="input-group-prepend cursor-pointer">
                      <Clipboard
                        component="span"
                        data-clipboard-text={address}
                        onSuccess={onCopy}
                        className="input-group-text text-primary mdi mdi-content-copy"
                      ></Clipboard>
                    </div>
                    <input
                      defaultValue={address}
                      dir="auto"
                      type="text"
                      className="form-control form-control"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label>{t("refCode")}</label>
                  <div className="input-group">
                    <div className="input-group-prepend cursor-pointer">
                      <Clipboard
                        component="span"
                        data-clipboard-text={name}
                        onSuccess={onCopy}
                        className="input-group-text text-primary mdi mdi-content-copy"
                      ></Clipboard>
                    </div>
                    <input
                      defaultValue={name}
                      dir="auto"
                      type="text"
                      className="form-control form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="inline-absolute center text-center">
                <Alert
                  variant="primary"
                  bsPrefix="alert alert-fill"
                  show={copid}
                >
                  {t("addressCopid")}
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
      {referrals && (
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title pb-3">{t("yourRefers")}</h4>
                {referrals.map((ref, i) => (
                  <div className="row tickets-card" key={i}>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("userName")}
                        </p>
                        <h4 className="font-weight-semibold mb-0 text-primary">
                          {ref.referral}
                        </h4>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("invested")}
                        </p>
                        <label
                          className={
                            "badge " +
                            (ref.invested ? "badge-success" : "badge-danger")
                          }
                        >
                          {t(ref.invested ? "yes" : "no")}
                        </label>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("profit")}
                        </p>
                        <h4 className="font-weight-semibold mb-0">
                          {t(ref.profit)}
                        </h4>
                      </div>
                    </div>
                    <div className="col d-flex mt-2 mb-2">
                      <div className="nowrap pl-3">
                        <p className="mb-2 font-weight-medium text-muted">
                          {t("joinDate")}
                        </p>
                        <span className="font-weight-semibold mb-0">
                          {timeAgo.format(new Date(ref.created_at).getTime())}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
