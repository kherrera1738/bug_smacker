import React from "react";
import DataGraph from "../DataGraph";

function StatsDashboard({ priorities, types, assigned, statuses }) {
  return (
    <>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
          <DataGraph
            dataset={priorities}
            graphType={"bar"}
            title={"Priorities"}
            card_label={"Tickets by Priority"}
          />
        </div>
        <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
          <DataGraph
            dataset={types}
            graphType={"doughnut"}
            title={"Types"}
            card_label={"Tickets by Type"}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
          <DataGraph
            dataset={statuses}
            graphType={"bar"}
            title={"Status"}
            card_label={"Tickets by Status"}
          />
        </div>
        <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mb-4">
          <DataGraph
            dataset={assigned}
            graphType={"doughnut"}
            title={"Assigned"}
            card_label={"Tickets by Assigned"}
            randomColor={true}
          />
        </div>
      </div>
    </>
  );
}

export default StatsDashboard;
