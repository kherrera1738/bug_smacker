import React from "react";

function AddProjForm({ projNameBar, descriptionArea, addProj }) {
  return (
    <form>
      <h2 className="mt-2">Add</h2>
      <input
        type="text"
        className="form-control fs-4"
        placeholder="Organization Name..."
        ref={projNameBar}
      />
      <textarea
        className="form-control fs-4 my-3"
        placeholder="Description.."
        rows="3"
        ref={descriptionArea}
      ></textarea>
      <button
        type="submit"
        className="btn btn-dark btn-lg fs-4"
        onClick={(e) => {
          addProj(e);
        }}
      >
        Add Project
      </button>
    </form>
  );
}

export default AddProjForm;
