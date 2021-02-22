import React, { useRef, useReducer, useEffect } from "react";
import CommentsList from "./CommentsList";
import { useGlobalContext } from "../AppContext";

const pageSize = 3;
const initalState = {
  order: "desc",
  searchTerm: "",
  sortTerm: "createdAt",
  pageIndex: 0,
  maxPage: 0,
  comments: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "setup":
      return {
        ...state,
        maxPage: Math.ceil(action.payload.length / pageSize),
        comments: action.payload,
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
    case "addComment":
      return { ...state, comments: [...state.comments, action.payload] };
  }
}

function CommentsSection({ comments, tid }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  const commentBar = useRef(null);
  const pageSize = 3;
  const { uid } = useGlobalContext();

  useEffect(() => {
    dispatch({ type: "setup", payload: comments });
  }, []);

  async function addComment(e) {
    e.preventDefault();
    const commentUrl = `/comments.json`;
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
      dispatch({ type: "addComment", payload: newComment });
    } catch (error) {
      console.log(error);
    }

    commentBar.current.value = "";
  }

  function matchesSearchTerm(comment) {
    let lcSearchTerm = state.searchTerm.toLowerCase();
    return (
      comment.madeBy.toLowerCase().includes(lcSearchTerm) ||
      comment.createdAt.toLowerCase().includes(lcSearchTerm) ||
      comment.content.toLowerCase().includes(lcSearchTerm)
    );
  }

  function sortComments(a, b) {
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

  function getComments() {
    let subsetComments = state.comments;
    if (state.searchTerm) {
      subsetComments = state.comments.filter(matchesSearchTerm);
    }
    subsetComments.sort(sortComments);
    state.maxPage = Math.ceil(subsetComments.length / pageSize);
    state.pageIndex = Math.min(state.pageIndex, state.maxPage - 1);
    state.pageIndex = Math.max(state.pageIndex, 0);
    return subsetComments.slice(
      state.pageIndex * pageSize,
      (state.pageIndex + 1) * pageSize
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
              ref={commentBar}
            />
          </div>
        </div>

        <div className="col-1">
          <button
            type="submit"
            className="btn btn-dark btn-lg"
            onClick={(e) => addComment(e)}
          >
            Add
          </button>
        </div>
      </form>
      <CommentsList
        comments={getComments()}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
}

export default CommentsSection;
