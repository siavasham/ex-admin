import React,{useRef,useEffect ,useState} from 'react';
import Breadcrumb from "component/breadcrumb";
import { t } from "locales";
import Table, { Tick } from "component/table";
import constans from "config/constans";
import Spinner from "component/spinner";
import { post } from "library/request";
import useStorage from "reducer";

export default function () {
  const tableRef = useRef();
  const { setting: { token }} = useStorage();
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState({});
  useEffect(() => {
    post("list", { token, pageSize: 1000, table: 'asset' }).then((res) => {
        if (res?.message == 'Success') {
            setLoading(false)
            const temp = {};
            for (let i of res.data.list) {
              temp[+i.id] = i.coin;
            }
            setCoins(temp)
        }
    });
  }, []);
  console.log(coins)
  return (
    <>
      <Breadcrumb title="pairs" icon="mdi-view-stream" />
      {
        loading
          ?
          <Spinner forDiv />
          :
          <Table
            link="pair"
            ref={tableRef}
            title={t("pairs")}
            columns={[
              { title: t("id"), field: "id", editable: "never" },
              {
                title: t("symbol"),
                field: "symbol",
              },
              {
                title: t("base"),
                field: "base",
                lookup: coins,
              },
              {
                title: t("quote"),
                field: "quote",
                lookup: coins,
              },
              {
                title: t("canTrade"),
                field: "canTrade",
                type: "boolean",
              },
              {
                title: t("status"),
                field: "status",
                lookup: constans.pairStatus,
                render: (row) => <Tick value={row.status} data={constans.assetStatus} />,
              },
              {
                title: t("minTrade"),
                field: "minTrade",
                type: "numeric",
              },
              {
                title: t("maxTrade"),
                field: "maxTrade",
                type: "numeric",
              },
              {
                title: t("step"),
                field: "step",
                type: "numeric",
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
          />
      }
    </>
  );
}
