import React from "react";
import SearchTable from "../SearchTable";
import AddProjForm from "./AddProjForm";

function ProjectsSection({ orgData, projNameBar, descriptionArea, addProj }) {
  const projectHeaders = [
    { name: "Name", val: "name" },
    { name: "View", val: "url", isUrl: true, placeholder: "View Project" },
  ];

  return (
    <div className="row justify-content-center text-white mb-5">
      <div className="col-12 col-xl-7 col-xxl-5 mb-4">
        <SearchTable
          rows={orgData.projects}
          headers={projectHeaders}
          pageSize={5}
          title={"Projects"}
        />
      </div>
      <div className="col-12 col-xl-3">
        <AddProjForm
          projNameBar={projNameBar}
          descriptionArea={descriptionArea}
          addProj={addProj}
        />
      </div>
    </div>
  );
}

export default ProjectsSection;
