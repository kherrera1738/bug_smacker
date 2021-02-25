import React from "react";

function AddOrgForm({ orgNameBar, addOrg }) {
  return (
    <form>
      <h2 className="mt-4">Add</h2>
      <section className="mt-3">
        <input
          type="text"
          className="form-control fs-4"
          placeholder="Organization Name..."
          ref={orgNameBar}
        />
      </section>
      <button
        type="submit"
        className="btn btn-dark btn-lg fs-4 mt-3"
        onClick={(e) => {
          addOrg(e);
        }}
      >
        Add Organization
      </button>
    </form>
  );
}

export default AddOrgForm;
