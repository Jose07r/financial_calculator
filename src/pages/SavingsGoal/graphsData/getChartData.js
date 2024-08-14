export default function getChartData(data) {
  const chartData = {
    labels: data.map((obj) => obj.month),
    datasets: [
      {
        label: 'Initial Balance',
        data: data.map((obj) => obj.principal),
        backgroundColor: '#84BDE0',
      },
      {
        label: 'Monthly Contributions',
        data: data.map((obj) => obj.accrued_contributions),
        backgroundColor: '#74E6F7',
      },
      {
        label: 'Accrued Interest',
        data: data.map((obj) => obj.accrued_interest),
        backgroundColor: '#5FD9CA',
      },
    ],
  };
  return chartData;
}
