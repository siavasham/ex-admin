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
import useTimeAgo from "library/timeAgo";
import Spinner from "component/spinner";

export default function ({ match }) {
  const timeAgo = useTimeAgo();
  const ticket = match.params.id ?? 0;
  const history = useHistory();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const {
    setting: { token },
  } = useStorage();
  const [text, setText] = useState("");
  const validate = () => {
    const temp = {};
    if (text.length < 10) temp["text"] = "validation.min";
    if (text == "") temp["text"] = "validation.empty";
    const res = _.isEmpty(temp) ? null : temp;
    setError(res);
    return res;
  };
  useEffect(() => {
    if (!ticket) {
      history.replace("/ticket");
    }
    getTicket();
  }, []);
  const getTicket = () => {
    post("view-ticket", { ticket, token }).then((res) => {
      if (res?.success) {
        setData(res?.success);
      }
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (validate() == null) {
      setLoading(true);
      post("replay-ticket", { ticket, text, token }).then((res) => {
        setLoading(false);
        if (res.success) {
          setSuccess(true);
          getTicket();
          setText("");
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
              <h4 className="card-title pb-2">{data?.title}</h4>
              {data?.messages?.length > 0 ? (
                data?.messages?.map((message, i) => (
                  <div
                    key={i}
                    className={
                      "card my-2 card-" +
                      (message.user_id == 0 ? "grey" : "info")
                    }
                  >
                    <div className="card-body">
                      <div>{message.text}</div>
                      <span className="badge badge-primary float-left">
                        {timeAgo.format(new Date(message.added_on).getTime())}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner forDiv />
              )}
              {!success && (
                <form className="mt-5" autoComplete="off" onSubmit={onSubmit}>
                  <Input
                    name={"replay"}
                    multiLine
                    value={text}
                    onChange={setText}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
