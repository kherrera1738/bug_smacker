import React, { useState } from "react";
import CommentsList from "./CommentsList";

function CommentsSection({ comments }) {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3;
  const maxPage = Math.ceil(comments.length / pageSize);

  function increment() {
    let newIndex = pageIndex;
    if (Math.ceil(comments.length / pageSize) > pageIndex + 1) {
      newIndex += 1;
    }
    console.log(Math.ceil(comments.length / pageSize));
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

  function getComments() {
    return comments.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  return (
    <>
      <h1>Add Comment</h1>

      <form className="row">
        <div className="col-11">
          <div className="input-group">
            <input
              type="text"
              className="form-control fs-4"
              id="inlineFormInputGroupUsername"
              placeholder="Comment..."
            />
          </div>
        </div>

        <div className="col-1">
          <button type="submit" className="btn btn-dark btn-lg">
            Add
          </button>
        </div>
      </form>
      <CommentsList
        comments={getComments()}
        pageIndex={pageIndex}
        maxPage={maxPage}
        increment={increment}
        decrement={decrement}
      />
    </>
  );
}

export default CommentsSection;
