import React, { useRef } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import Join from "./join";
import useStorage from "reducer";

export default function () {
  const tableRef = useRef();
  const {  session :{constans}} = useStorage();
  return (
    <>
      <Breadcrumb title="asset" icon="mdi-coin" />
      <Table
        link="asset"
        ref={tableRef}
        title={t("assets")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          {
            title: t("coin"),
            field: "coin",
          },
          {
            title: t("name"),
            field: "name",
          }, 
          {
            title: t("type"),
            field: "type",
            lookup: constans.assetType,
          },
          {
            title: t("status"),
            field: "status",
            lookup: constans.assetStatus,
            render: (row) => <Tick value={row.status} data={constans.assetStatus} />,
          },
          {
            title: t("precision"),
            field: "precision",
            type: "numeric",
          },
          {
            title: t("canDeposit"),
            field: "canDeposit",
            type: "boolean",
          },
          {
            title: t("canWithdraw"),
            field: "canWithdraw",
            type: "boolean",
          },
          {
            title: t("desk"),
            field: "desk",
            sorting: false,
            
          },
          {
            title: t("createdAt"),
            field: "createdAt",
            type: "datetime",
          },
        ]}
        duplicate={true}
        detailPanel={[
          {
            icon: ()=><i className="mdi mdi-server-network action-icon" />,
            tooltip: 'Assigned Networks',
            render: rowData => {
              return (
                <Join from="asset" id={rowData.id} />
              )
            },
          },
        ]}
      />
    </>
  );
}
