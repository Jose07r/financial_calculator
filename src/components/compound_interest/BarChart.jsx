import { Bar } from 'react-chartjs-2';
import getChartData from '@data/compound_interest/getChartData';
import { useInterestContext } from '@/contexts/InterestContext';

import styles from '@components/compound_interest/BarChart.module.css';

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

function BarChart({ breakdownChoice }) {
  const { results } = useInterestContext();

  // Get chart formatted data
  const { chartData, chartOptions } = getChartData(
    results[breakdownChoice],
    breakdownChoice,
    results.yearly.length
  );

  return (
    <div className={styles['bar_chart_container']}>
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

export default BarChart;
