import React from "react";
import Comment from "./Comment";
import Footer from "../Footer";

function CommentsList({ comments, state, dispatch }) {
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
    <div className="ticket-card mt-3 mb-0">
      <h1 className="px-3 py-3 my-0">Ticket Comments</h1>
      <div className="container-fluid search">
        <form>
          <div className="row justify-content-end align-items-center">
            <label className="col-2 col-form-label text-end fs-3">
              Search:
            </label>
            <div className="col-5 col-lg-3">
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
                  className={`sort-by ${getSortArrowClass("madeBy")}`}
                  onClick={(e) => changeSort(e, "madeBy")}
                >
                  Commenter
                </a>
              </th>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("content")}`}
                  onClick={(e) => changeSort(e, "content")}
                >
                  Message
                </a>
              </th>
              <th scope="col">
                <a
                  href=""
                  className={`sort-by ${getSortArrowClass("createdAt")}`}
                  onClick={(e) => changeSort(e, "createdAt")}
                >
                  Created
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => {
              return <Comment {...comment} key={index} />;
            })}
          </tbody>
        </table>
        <Footer state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default CommentsList;
