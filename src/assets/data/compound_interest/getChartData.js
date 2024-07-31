import { formatNumberWithCommas } from '@/utils/formatNumber';

export default function getChartData(data, breakdownChoice, yearsOfInvesting) {
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

  // Customized chart options
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (ctx) {
            return `${breakdownChoice === 'yearly' ? 'Year' : 'Month'} ${
              ctx[0].label
            }`;
          },
          label: function (ctx) {
            return `$${ctx.formattedValue}`;
          },
          footer: function (ctx) {
            function getCurrBalance() {
              const balance = ctx
                .map((el) => el.raw)
                .reduce((curr, val) => curr + val, 0)
                .toFixed(2);

              return formatNumberWithCommas(balance);
            }
            return `Total: $${getCurrBalance()}`;
          },
        },
        itemSort: function (a, b) {
          return b.datasetIndex - a.datasetIndex;
        },
        padding: 12,
        borderColor: '#74A5B5',
        borderWidth: 2,
        backgroundColor: '#FAFAFA',
        titleColor: '#4C707C',
        titleFont: { weight: 'bold', size: 14 },
        titleAlign: 'center',
        bodyColor: '#74A5B5',
        bodyFont: { weight: 'bold', size: 14 },
        bodySpacing: 4,
        boxPadding: 3,
        footerColor: '#118AB2',
        footerAlign: 'center',
        footerFont: { weight: 'bold', size: 13 },
        footerMarginTop: 10,
      },
      legend: {
        position: 'bottom',
        onClick: (e, legendItem, legend) => {
          e.defaultPrevented = true;
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        ticks: {
          callback: function (value) {
            return `$${formatNumberWithCommas(value)}`;
          },
        },
      },
    },
    animations: {
      x: false,
      delay: 0,
    },
    interaction: {
      mode: 'index',
    },
    aspectRatio: 2 / 1,
    responsive: true,
    maintainAspectRatio: true,
  };

  return { chartData, chartOptions };
}
