import React from "react";

function PositionForm({ users, userBar, roleBar, addRole, trialMode }) {
  return (
    <form>
      <section className="my-5">
        <h3>Users</h3>
        <select className="form-select fs-4" size="6" ref={userBar}>
          {users.map((user) => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
      </section>
      <h3>Roles</h3>
      <select className="form-select fs-4" size="4" ref={roleBar}>
        <option value="Admin">Admin</option>
        <option value="PM">PM</option>
        <option value="Dev">Dev</option>
        <option value="Submitter">Submitter</option>
      </select>
      <button
        type="submit"
        className="btn btn-dark btn-lg fs-4 mt-5"
        onClick={(e) => addRole(e)}
      >
        Add Role
      </button>
    </form>
  );
}

export default PositionForm;
