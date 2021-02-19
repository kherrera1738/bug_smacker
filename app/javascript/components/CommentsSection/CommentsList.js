import React from "react";
import Comment from "./Comment";
import Footer from "../Footer";

function CommentsList({
  comments,
  pageIndex,
  increment,
  decrement,
  maxPage,
  searchTerm,
  setSearchTerm,
}) {
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
              <th scope="col">Commenter</th>
              <th scope="col">Message</th>
              <th scope="col">Created</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => {
              return <Comment {...comment} key={index} />;
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

export default CommentsList;
