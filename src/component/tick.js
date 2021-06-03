import React from "react";
import { t } from "locales";

export const TickData = {
  yes: [t("no"), t("yes")],
  status: [t("inActive"), t("active")],
};
export default function ({ value, type = "yes" }) {
  return value == 1 ? (
    <div className="badge badge-pill badge-success">{TickData[type][1]}</div>
  ) : (
    <div className="badge badge-pill badge-danger">{TickData[type][0]}</div>
  );
}
