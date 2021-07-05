import React,{useRef} from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import useStorage from "reducer";
import Button from "component/button";
import Modal from "component/modal";
import Wallet from "route/coins/wallet";

export default function () {
  const tableRef = useRef();
  const modalRef = useRef();

  const {  session :{constans}} = useStorage();
  return (
    <>
      <Breadcrumb title="users" icon="mdi-account-multiple-outline" />
      <Modal ref={modalRef} />
      <Table
        link="user"
        ref={tableRef}
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
        detailPanel={row => {
          return (
            <div className="py-3 px-4 bg-detail">
              <Button
                className="btn btn-gradient-info font-weight-normal"
                onClick = {()=>{modalRef.current.show(<Wallet from="user" id={row.id} />)}}
              >
                {t("Wallets")}
              </Button>
              <button type="button" className="btn btn-gradient-primary font-weight-normal">{t('Transactions')}</button>
              <button type="button" className="btn btn-gradient-primary font-weight-normal">{t('Orders')}</button>
              <button type="button" className="btn btn-gradient-primary font-weight-normal">{t('Tikets')}</button>
              <button type="button" className="btn btn-gradient-danger font-weight-normal">{t('Logs')}</button>
           </div>
          )
        }}
      />
    </>
  );
}
