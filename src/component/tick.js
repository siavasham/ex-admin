import React from "react";
import { t } from "locales";

const type = ['danger','success','info','danger','warning','primary','secondary',];
export default function ({ value, data }) {
  return <div className={"badge badge-pill badge-"+type[+value]}>{data[+value]}</div>
}
