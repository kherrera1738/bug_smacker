import React, { useState } from "react";
import History from "./History";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function HistorySection({ histories }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 4;
  const maxPage = Math.ceil(histories.length / pageSize);

  function increment() {
    let newIndex = pageIndex;
    if (maxPage > pageIndex + 1) {
      newIndex += 1;
    }
    console.log(Math.ceil(histories.length / pageSize));
    console.log(pageIndex);
    console.log(newIndex);
    setPageIndex(newIndex);
  }

  function decrement() {
    let newIndex = pageIndex;
    if (0 < pageIndex) {
      newIndex -= 1;
    }
    console.log(pageIndex);
    console.log(newIndex);
    setPageIndex(newIndex);
  }

  function getHistories() {
    return histories.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  return (
    <div className="ticket-card mb-0">
      <h1 className="px-3 py-3 my-0">Ticket History</h1>
      <div className="ticket-card-body">
        <table className="table table-hover fs-3 mb-0">
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Old Value</th>
              <th scope="col">New Value</th>
              <th scope="col">Date Changed</th>
            </tr>
          </thead>
          <tbody>
            {getHistories().map((history, index) => {
              return <History {...history} key={index} />;
            })}
          </tbody>
        </table>
        <div className="row justify-content-center">
          <div className="col-6 py-4">
            <div className="container">
              <div className="row justify-content-start">
                <p>
                  Showing page {pageIndex + 1} out of {maxPage}
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 py-4 ">
            <div className="container">
              <div className="row justify-content-end fs-3">
                <div className="col-2">
                  <BsChevronCompactLeft onClick={decrement} />
                </div>
                <div className="col-1 text-center mx-3">{pageIndex + 1}</div>
                <div className="col-3 text-center">
                  <BsChevronCompactRight onClick={increment} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistorySection;
