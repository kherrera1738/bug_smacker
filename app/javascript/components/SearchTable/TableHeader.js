import React from "react";

function TableHeader({ headers, state, dispatch }) {
  function changeSort(e, newTerm) {
    e.preventDefault();
    dispatch({ type: "changeSort", payload: newTerm });
  }

  function getSortArrowClass(propName) {
    if (propName === state.sortTerm) {
      return state.order === "asc" ? "asc" : "desc";
    }
    return "";
  }

  return (
    <thead>
      <tr>
        {headers.map((header, index) => {
          return (
            <th key={index}>
              <a
                href=""
                className={`sort-by ${getSortArrowClass(header.val)}`}
                onClick={(e) => changeSort(e, header.val)}
              >
                {header.name}
              </a>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
export default TableHeader;
