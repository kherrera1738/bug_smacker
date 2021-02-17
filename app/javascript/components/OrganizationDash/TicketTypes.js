import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import { useOrganizationDashContext } from "./OrganizationDashContext";

function TicketTypes() {
  const { ticketTypes } = useOrganizationDashContext();
  const chartContainer = React.createRef();
  const [chartInstance, setChartInstance] = useState(null);

  const config = {
    type: "doughnut",
    data: {
      labels: ticketTypes.labels,
      datasets: [
        {
          label: "Ticket Types",
          backgroundColor: [
            "rgba(255, 99, 132)",
            "rgba(57, 134, 228)",
            "rgba(17, 176, 25)",
            "rgba(123, 29, 245)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(57, 134, 228, 1)",
            "rgba(17, 176, 25, 1)",
            "rgba(123, 29, 245)",
          ],
          data: ticketTypes.data,
        },
      ],
    },
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      Chart.defaults.global.defaultFontColor = "white";
      Chart.defaults.global.defaultFontSize = 15;
      const newChartInstance = new Chart(chartContainer.current, config);
      setChartInstance(newChartInstance);
    }
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title fs-2">Ticket by Types</div>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}

export default TicketTypes;
