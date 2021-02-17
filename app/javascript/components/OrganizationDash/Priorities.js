import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useOrganizationDashContext } from "./OrganizationDashContext";

function Priorities() {
  const { priorities } = useOrganizationDashContext();
  const chartContainer = React.createRef();
  const [chartInstance, setChartInstance] = useState(null);

  const config = {
    type: "bar",
    data: {
      labels: priorities.labels,
      datasets: [
        {
          label: "Priorities",
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(57, 134, 228)",
            "rgba(17, 176, 25)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(57, 134, 228, 1)",
            "rgba(17, 176, 25, 1)",
          ],
          data: priorities.data,
        },
      ],
    },
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, config);
      setChartInstance(newChartInstance);
    }
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title fs-2">Ticket by Priorities</div>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}

export default Priorities;
