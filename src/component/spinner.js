import React from "react";

export default function (props) {
  return (
    <div>
      <div
        className={"spinner-wrapper " + ("forDiv" in props ? "for-div" : "")}
      >
        <div className="donut"></div>
      </div>
    </div>
  );
}
