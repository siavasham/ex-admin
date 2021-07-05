import React, { useRef } from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import constans from "config/constans";
import Join from "./join";
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

export default function () {
  const tableRef = useRef();

  return (
    <>
      <Breadcrumb title="network" icon="mdi-server-network" />
      <Table
        link="network"
        ref={tableRef}
        title={t("networks")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          {
            title: t("name"),
            field: "name",
          },
          {
            title: t("type"),
            field: "type",
          },
          {
            title: t("isDefault"),
            field: "isDefault",
            type: "boolean",
          },
          {
            title: t("minConfirm"),
            field: "minConfirm",
            type: "numeric",
          },
          {
            title: t("unlockConfirm"),
            field: "unlockConfirm",
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
            title: t("withdrawFee"),
            field: "withdrawFee",
            type: "numeric",
          },
          {
            title: t("withdrawMin"),
            field: "withdrawMin",
            type: "numeric",
          },
          {
            title: t("depositMin"),
            field: "depositMin",
            type: "numeric",
          },
          {
            title: t("withdrawDesk"),
            field: "withdrawDesk",
            sorting: false,
            
          },
          {
            title: t("depositDesk"),
            field: "depositDesk",
            sorting: false,
            
          },
          {
            title: t("specialTips"),
            field: "specialTips",
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
            icon: ()=> <span className="action-icon" ><MonetizationOnOutlinedIcon /></span>,
            tooltip: 'Assigned Networks',
            render: rowData => {
              return (
                <Join from="network" id={rowData.id} />
              )
            },
          },
        ]}
      />
    </>
  );
}
