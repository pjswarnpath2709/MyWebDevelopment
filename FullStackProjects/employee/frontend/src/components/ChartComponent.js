import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Legend, Title, Tooltip } from "chart.js";
Chart.register(ArcElement, Legend, Title, Tooltip);

function ChartComponent({
  chartHeading,
  labelHeading,
  labels,
  dataForEachLabel,
  backgroundColorArray,
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: labelHeading,
        data: dataForEachLabel,
        backgroundColor: backgroundColorArray,
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="w-96 h-96">
      <Pie
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: chartHeading,
            },
          },
        }}
      />
    </div>
  );
}

export default ChartComponent;
