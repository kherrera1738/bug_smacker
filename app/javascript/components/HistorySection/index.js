import React, { useState } from "react";
import History from "./History";
import Footer from "../Footer";

function HistorySection({ histories }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 4;
  var maxPage = Math.ceil(histories.length / pageSize);

  function increment() {
    let newIndex = pageIndex;
    if (maxPage > pageIndex + 1) {
      newIndex += 1;
    }
    setPageIndex(newIndex);
  }

  function decrement() {
    let newIndex = pageIndex;
    if (0 < pageIndex) {
      newIndex -= 1;
    }
    setPageIndex(newIndex);
  }

  function matchesSearchTerm(history) {
    let lcSearchTerm = searchTerm.toLowerCase();
    return (
      history.changeType.toLowerCase().includes(lcSearchTerm) ||
      history.oldVal.toLowerCase().includes(lcSearchTerm) ||
      history.newVal.toLowerCase().includes(lcSearchTerm) ||
      history.changeDate.toLowerCase().includes(lcSearchTerm)
    );
  }

  function getHistories() {
    let subsetHistories = histories;
    if (searchTerm) {
      subsetHistories = histories.filter(matchesSearchTerm);
    }
    maxPage = Math.ceil(subsetHistories.length / pageSize);
    return subsetHistories.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );
  }

  return (
    <div className="ticket-card mb-0">
      <h1 className="px-3 py-3 my-0">Ticket History</h1>
      <div className="container-fluid search">
        <form>
          <div className="row justify-content-end align-items-center">
            <label className="col-2 col-form-label text-end fs-3">
              Search:
            </label>
            <div className="col-5">
              <input
                type="text"
                className="form-control fs-4 my-1"
                placeholder={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
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
        <Footer
          increment={increment}
          decrement={decrement}
          pageIndex={pageIndex}
          maxPage={maxPage}
        />
      </div>
    </div>
  );
}

export default HistorySection;
