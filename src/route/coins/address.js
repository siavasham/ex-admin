import React,{useRef,useEffect ,useState} from 'react';
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import useStorage from "reducer";

export default function ({modal = false , from , id}) {
  const tableRef = useRef();
  const {  session :{constans ,asset,network}} = useStorage();

  return (
    <>
      {!modal &&
        <Breadcrumb title="addresses" icon="mdi-qrcode-scan" />
      }
        <Table
        link="address"
        ref={tableRef}
        where={from ? { [from]: id } : null}
        title={t("addresses")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          {
            title: t("asset"),
            field: "asset",
            render: (row) => asset[row.asset]
          },
          {
            title: t("user"),
            field: "user",
            render: (row) => row.theUser.mobile != '' ? row.theUser.mobile : row.xuser.email
          },
          {
            title: t("network"),
            field: "network",
            render: (row) => network[row.network]
          },
          {
            title: t("address"),
            field: "address",
          },
          {
            title: t("tag"),
            field: "tag",
          },
          {
            title: t("status"),
            field: "status",
            lookup: constans.addressStatus,
            render: (row) => <Tick value={row.status} data={constans.addressStatus} />,
          },
          {
            title: t("createdAt"),
            field: "createdAt",
            type: "datetime",
          }
        ]}
        editable={{
          canAdd: modal,
          addInitial : from ? { [from]: id } : {}
        }}
        />
    </>
  );
}
