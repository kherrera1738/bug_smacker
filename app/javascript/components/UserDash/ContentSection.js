import React from "react";
import SearchTable from "../SearchTable";
import AddOrgForm from "./AddOrgForm";

function ContentSection({ positions, orgNameBar, addOrg, projects }) {
  const projectHeaders = [
    { name: "Name", val: "name" },
    { name: "Organization", val: "organization" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Project" },
  ];
  const organizationHeaders = [
    { name: "Name", val: "organization" },
    { name: "Role", val: "role" },
    { name: "Owned", val: "owned" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Organization" },
  ];

  return (
    <div className="container-fluid">
      <div className="row justify-content-center text-white">
        <div className="col-12 col-xl-8 col-xxl-6 mb-5">
          <SearchTable
            rows={positions}
            headers={organizationHeaders}
            pageSize={5}
            title={"Organizations"}
          />
        </div>
        <div className="col-12 col-xl-2 mb-3">
          <AddOrgForm orgNameBar={orgNameBar} addOrg={addOrg} />
        </div>
      </div>
      <div className="row justify-content-center text-white">
        <div className="col-12 col-xl-10 col-xxl-8">
          <SearchTable
            rows={projects}
            headers={projectHeaders}
            pageSize={5}
            title={"Projects"}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentSection;
