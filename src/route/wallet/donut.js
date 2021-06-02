import React, { useState, useEffect } from "react";
import DonutChart from "component/donut";
import { t } from "locales";
import exactMath from "exact-math";

const list = [
  { key: "balance", type: "primary", label: "deposited" },
  { key: "profit", type: "success", label: "profit" },
  { key: "referral", type: "danger", label: "referral" },
];
export default ({ wallet }) => {
  const handleSelected = (item) => {
    setSelected(item);
  };
  const referral = wallet?.referral > 0 ? wallet?.referral : 0.0001;
  const profit = wallet?.profit ? wallet?.profit : 0.0001;
  const allAmount = exactMath.add(wallet?.deposit ?? 0, profit, referral);
  const series = [
    {
      label: t("deposited"),
      value: wallet.deposit,
      data: wallet.deposit,
      selected: false,
    },
    {
      label: t("profit"),
      value: profit,
      data: profit,
      selected: false,
    },
    {
      label: t("referral"),
      value: referral,
      data: referral,
      selected: false,
    },
  ];
  const [selected, setSelected] = useState(series[0]);
  return (
    <div className="card">
      <div className="card-body text-center">
        <DonutChart
          height={300}
          width={300}
          chartWidth={12.25}
          outerRadius={0.95}
          outerRadiusHover={20}
          innerRadius={0.85}
          innerRadiusHover={8}
          emptyWidth={0.06}
          startAngle={-45}
          defaultLabel={selected?.label}
          defaultValue={selected?.value}
          total={allAmount}
          series={series}
          onSelected={handleSelected}
        />
        <div
          id="traffic-chart-legend"
          className="rounded-legend legend-vertical legend-bottom-left pt-4"
        >
          <ul>
            {list.map((item, i) => (
              <li key={i} className="d-flex justify-content-between py-2">
                <span>
                  <span className={"legend-dots bg-" + item.type}></span>
                  {t(item.label)}
                </span>
                <span className="float-left">
                  {Math.round((wallet[item.key] / allAmount) * 100)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
