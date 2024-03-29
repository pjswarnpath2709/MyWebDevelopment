import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = ({ views = [] }) => {
  const labels = getLastYearMonths();
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        title: {
          display: true,
          text: 'Yearly Views',
        },
      },
    },
  };
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Views',
        data: views,
        borderColor: 'rgba(107,70,193,0.5)',
        backgroundColor: '#6b46c1',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export const DoughnutChart = ({ data }) => {
  const dataD = {
    labels: ['Subscribe', 'Not Subscribed'],
    datasets: [
      {
        label: 'Views',
        data,
        borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={dataD} />;
};

const getLastYearMonths = () => {
  const labels = [];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonth = new Date().getMonth();
  const remain = 11 - currentMonth;
  for (let i = currentMonth; i < months.length; i--) {
    labels.unshift(months[i]);
    if (i === 0) break;
  }

  for (let i = 11; i > remain; i--) {
    if (i === currentMonth) break;
    labels.unshift(months[i]);
  }
  return labels;
};
