import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useOrganizationDashContext } from "./OrganizationDashContext";

function Statuses() {
  const { statuses } = useOrganizationDashContext();
  const chartContainer = React.createRef();
  const [chartInstance, setChartInstance] = useState(null);
  const fontColor = "white";

  const config = {
    type: "bar",
    data: {
      labels: statuses.labels,
      datasets: [
        {
          label: "Status",
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(57, 134, 228)",
            "rgba(17, 176, 25)",
            "rgba(123, 29, 245)",
            "rgba(235, 221, 25)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(57, 134, 228, 1)",
            "rgba(17, 176, 25, 1)",
            "rgba(123, 29, 245)",
            "rgba(235, 221, 25)",
          ],
          data: statuses.data,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              stepSize: 1,
            },
          },
        ],
      },
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
        <div className="card-title fs-2">Ticket by Status</div>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}

export default Statuses;
