import React, { useReducer, useEffect } from "react";
import TableRow from "./TableRow";
import Footer from "./Footer";
import TableHeader from "./TableHeader";

const initalState = {
  order: "desc",
  searchTerm: "",
  sortTerm: "",
  pageIndex: 0,
  maxPage: 0,
  rows: [],
  pageSize: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "setup":
      return {
        ...state,
        maxPage: Math.ceil(action.rows.length / action.pageSize),
        rows: action.rows,
        pageSize: action.pageSize,
        sortTerm: action.headers[action.headers.length - 1].val,
      };
    case "increment":
      return {
        ...state,
        pageIndex:
          state.maxPage > state.pageIndex + 1
            ? state.pageIndex + 1
            : state.pageIndex,
      };
    case "decrement":
      return {
        ...state,
        pageIndex: 0 < state.pageIndex ? state.pageIndex - 1 : state.pageIndex,
      };

    case "setSearchTerm":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "changeSort":
      let newOrder = "desc";
      if (action.payload !== state.sortTerm || state.order === "desc") {
        newOrder = "asc";
      }

      return {
        ...state,
        order: newOrder,
        sortTerm: action.payload,
      };
  }
}

function SearchTable({ rows, headers, pageSize, title }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(() => {
    dispatch({
      type: "setup",
      rows: rows,
      pageSize: pageSize,
      headers: headers,
    });
  }, [rows]);

  function matchesSearchTerm(row) {
    let lcSearchTerm = state.searchTerm.toLowerCase();
    for (let i = 0; i < headers.length; i++) {
      const val = headers[i].val;
      if (row[val].toLowerCase().includes(lcSearchTerm)) {
        return true;
      }
    }
    return false;
  }

  function sortrows(a, b) {
    let h1 = a[state.sortTerm].toLowerCase();
    let h2 = b[state.sortTerm].toLowerCase();
    let mod = state.order === "desc" ? -1 : 1;
    if (h1 < h2) {
      return -1 * mod;
    }
    if (h1 > h2) {
      return 1 * mod;
    }
    return 0;
  }

  function getrows() {
    let subsetrows = state.rows;
    if (state.searchTerm) {
      subsetrows = state.rows.filter(matchesSearchTerm);
    }
    subsetrows.sort(sortrows);
    state.maxPage = Math.ceil(subsetrows.length / pageSize);
    state.pageIndex = Math.min(state.pageIndex, state.maxPage - 1);
    state.pageIndex = Math.max(state.pageIndex, 0);
    return subsetrows.slice(
      state.pageIndex * pageSize,
      (state.pageIndex + 1) * pageSize
    );
  }

  return (
    <div className="ticket-card mb-0">
      <h1 className="px-3 py-3 my-0">{title}</h1>
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
                placeholder={state.searchTerm}
                onChange={(e) =>
                  dispatch({ type: "setSearchTerm", payload: e.target.value })
                }
              />
            </div>
          </div>
        </form>
      </div>
      <div className="ticket-card-body">
        <div className="table-responsive">
          <table className="table table-hover fs-3 mb-0">
            <TableHeader headers={headers} state={state} dispatch={dispatch} />
            <tbody>
              {getrows().map((row, index) => {
                return <TableRow row={row} headers={headers} key={index} />;
              })}
            </tbody>
          </table>
        </div>
        <Footer state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default SearchTable;
