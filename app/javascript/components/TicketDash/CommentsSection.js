import React, { useRef, useState } from "react";
import SearchTable from "../SearchTable";
import { useGlobalContext } from "../AppContext";

function CommentsSection({ comments, tid, trialMode }) {
  const [currentComments, setComments] = useState(comments);
  const commentBar = useRef(null);
  const { uid } = useGlobalContext();
  const commentHeaders = [
    { name: "Commenter", val: "madeBy" },
    { name: "Message", val: "content" },
    { name: "Created", val: "createdAt" },
  ];

  async function addComment(e) {
    e.preventDefault();
    const commentUrl = trialMode ? "/trials/comments.json" : `/comments.json`;
    const data = {
      content: commentBar.current.value,
      ticket_id: tid,
      made_by_id: uid,
    };
    const requestObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(commentUrl, requestObject);
      const newComment = await response.json();
      setComments([...currentComments, newComment]);
    } catch (error) {
      console.log(error);
    }

    commentBar.current.value = "";
  }

  return (
    <>
      <h1 className="mb-0">Add Comment</h1>

      <form className="row mb-2">
        <div className="col-12 col-sm-10 mb-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control fs-4"
              id="inlineFormInputGroupUsername"
              placeholder="Comment..."
              ref={commentBar}
            />
          </div>
        </div>

        <div className="d-grid gap-2 col-2 mb-2">
          <button
            type="submit"
            className="btn btn-dark btn-lg"
            onClick={(e) => addComment(e)}
          >
            Add
          </button>
        </div>
      </form>
      <SearchTable
        rows={currentComments}
        headers={commentHeaders}
        pageSize={3}
        title={"Ticket Comments"}
      />
    </>
  );
}

export default CommentsSection;
