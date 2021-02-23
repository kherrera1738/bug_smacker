import React from "react";

function TeamMemberForm({ positions, userBar, addMember }) {
  return (
    <form>
      <section className="my-5">
        <h3>Organization Users</h3>
        <select className="form-select fs-4" size="6" ref={userBar}>
          {positions.map((user) => {
            return (
              <option value={user.uid} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </section>
      <button
        type="submit"
        className="btn btn-dark btn-lg fs-4 mt-3"
        onClick={(e) => addMember(e)}
      >
        Add Member
      </button>
    </form>
  );
}

export default TeamMemberForm;
