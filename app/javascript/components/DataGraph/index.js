import React, { useEffect, useState } from "react";
import Chart, { scaleService } from "chart.js";

function DataGraph({ dataset, graphType, title, card_label }) {
  const chartContainer = React.createRef();
  const [chartInstance, setChartInstance] = useState(null);

  const { labels, data } = dataset;

  var options = {};
  if (graphType === "bar") {
    options = {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }],
      },
    };
  }

  const config = {
    type: graphType,
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(57, 134, 228, 1)",
            "rgba(17, 176, 25, 1)",
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
          data: data,
        },
      ],
    },
    options: options,
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, config);
      Chart.defaults.global.defaultFontColor = "white";
      Chart.defaults.global.defaultFontSize = 15;
      setChartInstance(newChartInstance);
    }
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title fs-2">{card_label}</div>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}

export default DataGraph;
