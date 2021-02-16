import { func } from "prop-types";
import React from "react";

function Loading() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-light loading" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
