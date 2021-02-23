import React, { useEffect, useReducer } from "react";
import Footer from "../Footer";
import Position from "./Position";

const pageSize = 10;
const initalState = {
  order: "desc",
  searchTerm: "",
  sortTerm: "name",
  pageIndex: 0,
  maxPage: 0,
  positions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setup":
      return {
        ...state,
        maxPage: Math.ceil(action.payload.length / pageSize),
        positions: action.payload,
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

function PositionList({ positions }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  useEffect(() => {
    dispatch({ type: "setup", payload: positions });
  }, [positions]);

  function changeSort(e, newTerm) {
    e.preventDefault();
    dispatch({ type: "changeSort", payload: newTerm });
  }

  function matchesSearchTerm(position) {
    let lcSearchTerm = state.searchTerm.toLowerCase();
    return (
      position.role.toLowerCase().includes(lcSearchTerm) ||
      position.name.toLowerCase().includes(lcSearchTerm)
    );
  }

  function sortPositions(a, b) {
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

  function getPositions() {
    let subsetPositions = state.positions;
    if (state.searchTerm) {
      subsetPositions = state.positions.filter(matchesSearchTerm);
    }
    subsetPositions.sort(sortPositions);
    state.maxPage = Math.ceil(subsetPositions.length / pageSize);
    state.pageIndex = Math.min(state.pageIndex, state.maxPage - 1);
    state.pageIndex = Math.max(state.pageIndex, 0);
    return subsetPositions.slice(
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
      <h1 className="px-3 py-3 my-0">Organization Roles</h1>
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
                  className={`sort-by ${getSortArrowClass("role")}`}
                  onClick={(e) => changeSort(e, "role")}
                >
                  Name
                </a>
              </th>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("name")}`}
                  onClick={(e) => changeSort(e, "name")}
                >
                  Role
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {getPositions().map((position, index) => {
              return <Position {...position} key={index} />;
            })}
          </tbody>
        </table>
        <Footer state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default PositionList;
