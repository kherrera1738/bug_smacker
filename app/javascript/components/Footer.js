import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function Footer({ state, dispatch }) {
  return (
    <div className="row justify-content-center">
      <div className="col-6 py-4">
        <div className="container">
          <div className="row justify-content-start">
            <p>
              Showing page {state.pageIndex + 1} out of {state.maxPage}
            </p>
          </div>
        </div>
      </div>
      <div className="col-6 py-4 ">
        <div className="container">
          <div className="row justify-content-end fs-3">
            <div className="col-2">
              <BsChevronCompactLeft
                onClick={() => dispatch({ type: "decrement" })}
              />
            </div>
            <div className="col-1 text-center mx-3">{state.pageIndex + 1}</div>
            <div className="col-3 text-center">
              <BsChevronCompactRight
                onClick={() => dispatch({ type: "increment" })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
