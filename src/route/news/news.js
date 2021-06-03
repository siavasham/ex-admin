import React from "react";
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick, TickData } from "component/table";
import AddBox from "@material-ui/icons/AddBox";
import Edit from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import { baseUrl } from "library/request";
export default function () {
  const history = useHistory();
  const gotoAdd = () => {
    history.push("/news/add");
  };
  const gotoEdit = (e, row) => {
    history.push({
      pathname: "/news/edit",
      state: row,
    });
  };
  return (
    <>
      <Breadcrumb title="news" icon="mdi-newspaper" />
      <Table
        link="news"
        title={t("news")}
        columns={[
          { title: t("id"), field: "id", editable: "never" },
          { title: t("title"), field: "title" },
          {
            title: t("image"),
            field: "image",
            sorting: false,
            editable: "never",
            render: (row) => (
              <img src={baseUrl + "news/" + row.image} className="news-image" />
            ),
          },
          { title: t("desc"), field: "desc", sorting: false },
          {
            title: t("status"),
            field: "status",
            lookup: Object.assign({}, TickData["status"]),
            render: (row) => <Tick value={row.status} type="status" />,
          },
          {
            title: t("date"),
            field: "created_at",
            type: "datetime",
            dateSetting: { locale: "fa-IR" },
          },
        ]}
        editable={{ canAdd: false, canEdit: false }}
        actions={[
          {
            icon: () => <AddBox />,
            tooltip: t("addNews"),
            isFreeAction: true,
            onClick: gotoAdd,
          },
          {
            icon: () => <Edit />,
            tooltip: t("edit"),
            onClick: gotoEdit,
          },
        ]}
      />
    </>
  );
}
