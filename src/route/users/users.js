import React from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick, TickData } from "component/table";

export default function () {
  return (
    <>
      <Breadcrumb title="users" icon="mdi-account-multiple-outline" />
      <Table
        link="users"
        title={t("users")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          { title: t("name"), field: "name" },
          { title: t("phone"), field: "phone" },
          {
            title: t("verify"),
            field: "verify",
            lookup: Object.assign({}, TickData["yes"]),
            render: (row) => <Tick value={row.verify} type="yes" />,
          },
          {
            title: t("status"),
            field: "status",
            lookup: Object.assign({}, TickData["status"]),
            render: (row) => <Tick value={row.status} type="status" />,
          },
          { title: t("level"), field: "level", type: "numeric" },
          {
            title: t("date"),
            field: "created_at",
            type: "datetime",
            dateSetting: { locale: "fa-IR" },
          },
        ]}
      />
    </>
  );
}
