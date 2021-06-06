import React from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick, TickData } from "component/table";

export default function () {
  return (
    <>
      <Breadcrumb title="constans" icon="mdi-account-multiple-outline" />
      <Table
        link="constans"
        title={t("constans")}
        options={{ pageSize: 50 }}
        columns={[
          { title: t("key"), field: "key", editable: "never" },
          { title: t("value"), field: "value" },
        ]}
        editable={{ canDelete: false }}
      />
    </>
  );
}
