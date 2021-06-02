import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import { toMoney } from "library/helper";
import exactMath from "exact-math";
import { Link } from "react-router-dom";
import Table from "component/table";

export default function () {
  const [tickets, setTickets] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {}, []);

  return (
    <Table
      title={t("users")}
      columns={[
        {
          title: t("type"),
          field: "type",
          lookup: { crypto: "crypto", forex: "forex", stocks: "stocks" },
        },
        { title: t("symbol"), field: "symbol" },
        { title: t("display"), field: "display" },
        { title: t("description"), field: "description" },
      ]}
    />
  );
}
