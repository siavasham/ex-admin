import React, { useState, useEffect } from "react";
import { QRCode } from "react-qr-svg";
import Clipboard from "react-clipboard.js";
import Alert from "react-bootstrap/Alert";
import { t } from "locales";

export default (props) => {
  const [copid, setCopid] = useState(false);
  const onCopy = () => {
    setCopid(true);
    setTimeout(() => {
      setCopid(false);
    }, 5000);
  };
  return (
    <div className="auth">
      <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3 text-center qr-code">
          <QRCode
            bgColor="#2b2c31"
            fgColor="#ddd"
            level="Q"
            style={{ maxWidth: 200 }}
            value={props.address}
          />
        </div>
        <div className="input-group mb-3 auth-form-transparent">
          <div className="input-group-prepend cursor-pointer">
            <Clipboard
              component="span"
              data-clipboard-text={props.address}
              onSuccess={onCopy}
              className="input-group-text text-primary mdi mdi-content-copy"
            ></Clipboard>
          </div>
          <input
            value={props.address}
            readOnly
            dir="auto"
            type="text"
            className="form-control form-control"
          />
        </div>
        <Alert variant="info" bsPrefix="alert alert-fill">
          {t("depositInfo")}
        </Alert>
        <div className="inline-absolute center text-center">
          <Alert variant="primary" bsPrefix="alert alert-fill" show={copid}>
            {t("addressCopid")}
          </Alert>
        </div>
      </form>
    </div>
  );
};
