export default function getChartData(data, breakdownChoice) {
  const chartData = {
    labels: data.map((obj) =>
      breakdownChoice === 'yearly' ? obj.year : obj.month
    ),
    datasets: [
      {
        label: 'Initial Investment',
        data: data.map((obj) => obj.principal),
        backgroundColor: '#84BDE0',
      },
      {
        label: `${
          breakdownChoice === 'yearly' ? 'Yearly' : 'Monthly'
        } Contributions`,
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
