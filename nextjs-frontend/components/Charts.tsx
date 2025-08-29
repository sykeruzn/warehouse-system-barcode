'use client';

import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale,
  ChartOptions,
  ChartData,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

import DashboardCard from './DashboardCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  TimeScale
);

interface ScannedItemsData {
  date: string;
  count: number;
}

interface StatusDistributionData {
  status: string;
  count: number;
}

interface TopMovedSKUsData {
  sku: string;
  total_quantity: number;
}

interface ChartsProps {
  scannedItems: ScannedItemsData[];
  statusDistribution: StatusDistributionData[];
  topMovedSKUs: TopMovedSKUsData[];
}

const Charts: React.FC<ChartsProps> = ({
  scannedItems,
  statusDistribution,
  topMovedSKUs,
}) => {
  // Time Series of Scanned Items
  const lineChartData: ChartData<'line'> = {
    labels: scannedItems.map((item) => new Date(item.date)),
    datasets: [
      {
        label: 'Scanned Items',
        data: scannedItems.map((item) => item.count),
        borderColor: '#41436a',
        backgroundColor: '#04454d',
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: '#41436a',
      },
    ],
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { bottom: 20 }, // prevent labels cut off
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d',
          displayFormats: { day: 'MMM d' },
        },
        grid: { display: false },
        ticks: {
          font: { family: 'Inter' },
          maxRotation: 45,
          minRotation: 45,
          padding: 10, // add space from edge
        },
      },
      y: {
        beginAtZero: true,
        border: { dash: [5, 5] },
        ticks: { font: { family: 'Inter' }, padding: 8 },
      },
    },
  };

  // Status IN vs OUT Pie
  const pieChartData: ChartData<'pie'> = {
    labels: statusDistribution.map((item) => item.status),
    datasets: [
      {
        label: '# of Scans',
        data: statusDistribution.map((item) => item.count),
        backgroundColor: [
          '#60628f',
          '#2C3E50',
        ],
        borderColor: ['#60628f', '#2C3E50'],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20, // adds breathing room around chart/legend
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { family: 'Inter' } },
      },
      title: { display: false },
    },
  };

  // Top Moved SKUs Bar
  const barChartData: ChartData<'bar'> = {
    labels: topMovedSKUs.map((item) => item.sku),
    datasets: [
      {
        label: 'Total Quantity Moved',
        data: topMovedSKUs.map((item) => item.total_quantity),
        backgroundColor: '#41436a',
        borderColor: '#41436a',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { bottom: 20 }, // prevent x-axis cut off
    },
    indexAxis: 'x',
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter' }, padding: 10 },
      },
      y: {
        beginAtZero: true,
        border: { dash: [5, 5] },
        ticks: { font: { family: 'Inter' }, padding: 8 },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard title="Top Moved SKUs" className="lg:col-span-2 h-96">
        <Bar data={barChartData} options={barChartOptions} />
      </DashboardCard>

    <DashboardCard
    title="Status IN vs OUT"
    className="h-96"
    >
    <div className="w-full h-full flex justify-center items-center p-4">
        <div className="w-full h-full max-w-sm">
        <Pie data={pieChartData} options={pieChartOptions} />
        </div>
    </div>
    </DashboardCard>


      <DashboardCard
        title="Time Series of Scanned Items"
        className="lg:col-span-3 h-[32rem]"
      >
        <Line data={lineChartData} options={lineChartOptions} />
      </DashboardCard>
    </div>
  );
};

export default Charts;
