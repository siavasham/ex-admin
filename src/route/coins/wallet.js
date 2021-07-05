import React,{useRef,useEffect ,useState} from 'react';
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import useStorage from "reducer";
import Modal from "component/modal";
import Address from "./address";

export default function ({modal = false , from = null , id}) {
  const tableRef = useRef();
  const modalRef = useRef();
  const {  session :{constans}} = useStorage();

  return (
    <>
      {!modal &&
        <Breadcrumb title="wallets" icon="mdi-wallet" />
      }
        <Modal ref={modalRef} />
        <Table
          link="wallet"
          ref={tableRef}
          where={from ? { [from]: id } : null}
          title={t("wallets")}
          columns={[
            { title: t("id"), field: "id", editable: "never" },
            ...(from != 'asset' ?
              [{
                title: t("asset"),
                field: "asset",
                render: (row) => row.theAsset.coin
              }]
              :
              []
            ),
            ...(from != 'user' ?
              [{
                title: t("user"),
                field: "user",
                render: (row) => row.theUser.mobile !='' ? row.theUser.mobile: row.xuser.email
              }]
              :
              []
            ),
            {
              title: t("balance"),
              field: "balance",
              type: "numeric",
            },
            {
              title: t("free"),
              field: "free",
              type: "numeric",
            },
            {
              title: t("freeze"),
              field: "freeze",
              type: "numeric",
            },
            {
              title: t("locked"),
              field: "locked",
              type: "numeric",
            },
            {
              title: t("status"),
              field: "status",
              lookup: constans.walletStatus,
              render: (row) => <Tick value={row.status} data={constans.assetStatus} />,
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
            {
              title: t("updatedAt"),
              field: "updatedAt",
              type: "datetime",
            },
        ]}
        actions={[
          {
            icon: () => <i className="mdi mdi-qrcode-scan action-icon"></i>,
            tooltip: "adresses",
            onClick: (e, row) =>
            modalRef.current.show(<Address from="wallet" id={row.id} />)
          }
        ]}
        editable={{
          addInitial : from ? { [from]: id } : {}
        }}
        />
    </>
  );
}
