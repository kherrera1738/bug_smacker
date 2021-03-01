import React, { useEffect, useState } from "react";
import Chart, { scaleService } from "chart.js";

function DataGraph({
  dataset,
  graphType,
  title,
  card_label,
  randomColor = false,
}) {
  const chartContainer = React.createRef();
  const [chartInstance, setChartInstance] = useState(null);

  const { labels, data } = dataset;

  var options = {};
  var borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(57, 134, 228, 1)",
    "rgba(17, 176, 25, 1)",
    "rgba(123, 29, 245)",
    "rgba(235, 221, 25)",
  ];
  var backgroundColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(57, 134, 228, 1)",
    "rgba(17, 176, 25, 1)",
    "rgba(123, 29, 245)",
    "rgba(235, 221, 25)",
  ];

  function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // Start y-axis at 0 if this is a bar graph
  if (graphType === "bar") {
    options = {
      scales: {
        yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }],
      },
    };
  }

  // If random colors option is on then generate one color for each label
  if (randomColor) {
    var colors = [];
    for (let i = 0; i < labels.length; i++) {
      colors.push(dynamicColors());
    }
    borderColor = colors;
    backgroundColor = colors;
  }

  const config = {
    type: graphType,
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
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
