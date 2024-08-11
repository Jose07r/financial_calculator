import { Bar } from 'react-chartjs-2';

import styles from '@components/BarChart/BarChart.module.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

function BarChart({ chartData, chartOptions }) {
  return (
    <div className={styles['bar_chart_container']}>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

export default BarChart;
