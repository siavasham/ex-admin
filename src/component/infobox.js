import React from "react";

export default function ({ title, text }) {
  return (
    <div className="row">
      <div className="col-12 mb-3">
        <div className="card card-warning">
          <div className="card-body">
            <div className="container text-center">
              {title && <h3 className="mb-3">{title}</h3>}
              {text && <span className="mx-auto">{text}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
