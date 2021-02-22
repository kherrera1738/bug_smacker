import React, { useReducer, useEffect } from "react";
import History from "./History";
import Footer from "../Footer";

const pageSize = 4;
const initalState = {
  order: "desc",
  searchTerm: "",
  sortTerm: "changeDate",
  pageIndex: 0,
  maxPage: 0,
  histories: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setup":
      return {
        ...state,
        maxPage: Math.ceil(action.payload.length / pageSize),
        histories: action.payload,
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

function HistorySection({ histories }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(() => {
    dispatch({ type: "setup", payload: histories });
  }, []);

  function changeSort(e, newTerm) {
    e.preventDefault();
    dispatch({ type: "changeSort", payload: newTerm });
  }

  function matchesSearchTerm(history) {
    let lcSearchTerm = state.searchTerm.toLowerCase();
    return (
      history.changeType.toLowerCase().includes(lcSearchTerm) ||
      history.oldVal.toLowerCase().includes(lcSearchTerm) ||
      history.newVal.toLowerCase().includes(lcSearchTerm) ||
      history.changeDate.toLowerCase().includes(lcSearchTerm)
    );
  }

  function sortHistories(a, b) {
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

  function getHistories() {
    let subsetHistories = histories;
    if (state.searchTerm) {
      subsetHistories = state.histories.filter(matchesSearchTerm);
    }
    subsetHistories.sort(sortHistories);
    state.maxPage = Math.ceil(subsetHistories.length / pageSize);
    state.pageIndex = Math.min(state.pageIndex, state.maxPage - 1);
    state.pageIndex = Math.max(state.pageIndex, 0);
    return subsetHistories.slice(
      state.pageIndex * pageSize,
      (state.pageIndex + 1) * pageSize
    );
  }

  function getSortArrowClass(propName) {
    if (propName === state.sortTerm) {
      return state.order === "asc" ? "asc" : "desc";
    }
    return "";
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
        <table className="table table-hover fs-3 mb-0">
          <thead>
            <tr>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("changeType")}`}
                  onClick={(e) => changeSort(e, "changeType")}
                >
                  Property
                </a>
              </th>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("oldVal")}`}
                  onClick={(e) => changeSort(e, "oldVal")}
                >
                  Old Value
                </a>
              </th>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("newVal")}`}
                  onClick={(e) => changeSort(e, "newVal")}
                >
                  New Value
                </a>
              </th>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("changeDate")}`}
                  onClick={(e) => changeSort(e, "changeDate")}
                >
                  Date Changed
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {getHistories().map((history, index) => {
              return <History {...history} key={index} />;
            })}
          </tbody>
        </table>
        <Footer state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default HistorySection;
