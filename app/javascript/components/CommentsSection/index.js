import React, { useState } from "react";
import CommentsList from "./CommentsList";

function CommentsSection({ comments }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 3;
  var maxPage = Math.ceil(comments.length / pageSize);

  function increment() {
    let newIndex = pageIndex;
    if (Math.ceil(comments.length / pageSize) > pageIndex + 1) {
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

  function matchesSearchTerm(comment) {
    let lcSearchTerm = searchTerm.toLowerCase();
    return (
      comment.madeBy.toLowerCase().includes(lcSearchTerm) ||
      comment.createdAt.toLowerCase().includes(lcSearchTerm) ||
      comment.content.toLowerCase().includes(lcSearchTerm)
    );
  }

  function getComments() {
    let subsetComments = comments;
    if (searchTerm) {
      subsetComments = comments.filter(matchesSearchTerm);
    }
    maxPage = Math.ceil(subsetComments.length / pageSize);
    return subsetComments.slice(
      pageIndex * pageSize,
      (pageIndex + 1) * pageSize
    );
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
}

export default CommentsSection;
