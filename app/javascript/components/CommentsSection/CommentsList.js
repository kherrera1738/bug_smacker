import React from "react";
import Comment from "./Comment";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

function CommentsList({ comments, pageIndex, increment, decrement, maxPage }) {
  return (
    <div className="ticket-card mt-3 mb-0">
      <h1 className="px-3 py-3 my-0">Ticket Comments</h1>
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

export default CommentsList;
