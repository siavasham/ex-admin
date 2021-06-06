import React, { useRef } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick, TickData } from "component/table";
import { toMoney } from "library/helper";
import BarChartRoundedIcon from "@material-ui/icons/BarChartRounded";
import { get } from "library/request";

export default function () {
  const tableRef = useRef();
  const refresh = () => {
    get("refresh-coins").then((data) => {
      tableRef.current.refresh();
    });
  };
  return (
    <>
      <Breadcrumb title="users" icon="mdi-account-multiple-outline" />
      <Table
        link="coins"
        ref={tableRef}
        title={t("coins")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          {
            title: t("name"),
            field: "name",
            render: (row) => (
              <i className={"icon icon-2x icon-" + row.name.toLowerCase()} />
            ),
          },
          { title: t("fullname"), field: "fullname" },
          { title: t("dname"), field: "dname" },
          {
            title: t("price"),
            field: "price",
            type: "currency",
            render: (row) => toMoney(row.price),
          },
          {
            title: t("balance"),
            field: "balance",
            type: "currency",
            render: (row) => toMoney(row.balance),
          },
          {
            title: t("homepage"),
            field: "homepage",
            lookup: Object.assign({}, TickData["yes"]),
            render: (row) => <Tick value={row.verify} type="yes" />,
          },
          {
            title: t("status"),
            field: "status",
            lookup: Object.assign({}, TickData["status"]),
            render: (row) => <Tick value={row.status} type="status" />,
          },
        ]}
        actions={[
          {
            icon: () => <BarChartRoundedIcon />,
            tooltip: t("refreshPrice"),
            isFreeAction: true,
            onClick: refresh,
          },
        ]}
      />
    </>
  );
}
