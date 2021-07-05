import React, { useState, useEffect } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import { toMoney } from "library/helper";
import exactMath from "exact-math";
import { Link } from "react-router-dom";
import Spinner from "component/spinner";

const types = {
  open: "badge-gradient-success",
  progress: "badge-gradient-warning",
  "on-hold": "badge-gradient-info",
  done: "badge-gradient-dark",
  rejected: "badge-gradient-danger",
};

export default function () {
  const [tickets, setTickets] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    setting: { token },
  } = useStorage();

  useEffect(() => {
   
  }, []);
  if (loading) return <Spinner forDiv />;
  return (
    <div>
      <Breadcrumb title="dashboard" icon="mdi-home" />
     </div>
  );
}
