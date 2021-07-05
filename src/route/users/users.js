import React from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import constans from "config/constans";

export default function () {
  return (
    <>
      <Breadcrumb title="users" icon="mdi-account-multiple-outline" />
      <Table
        link="user"
        title={t("users")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          { title: t("mobile"), field: "mobile" },
          { title: t("email"), field: "email" },
          {
            title: t("verify"),
            field: "verify",
            type: "boolean",
          },
          {
            title: t("status"),
            field: "status",
            lookup: constans.userStatus,
            render: (row) => <Tick value={row.status} data={constans.userStatus} />,
          },
          {
            title: t("level"),
            field: "level",
            lookup: constans.userLevel,
            render: (row) => <Tick value={row.level} data={constans.userLevel} />,
          },
          {
            title: t("join"),
            field: "createdAt",
            type: "datetime",
          },
        ]}
      />
    </>
  );
}
