import { func } from "prop-types";
import React from "react";

function Loading() {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div class="spinner-border text-light loading" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
