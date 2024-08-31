import reduceDecimalsFromObject from '@/utils/reduceDecimalsFromObject';

const calculateLoanContribution = (loanAmount, numOfPayments, interestRate) => {
  const monthlyInterestRate = interestRate / 12 / 100;
  const startingDate = new Date();

  // Monthly payment formula
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numOfPayments));

  const { month, year } = getMonthYear(startingDate, 0);
  const data = {
    [year]: {
      rows: [
        {
          month: `${month.slice(0, 3)} ${year}`,
          payment: '-',
          principal: '-',
          interest: '-',
          remainingBalance: loanAmount,
        },
      ],
      totals: {
        payment: 0,
        principal: 0,
        interest: 0,
        remainingBalance: 0,
      },
    },
  };

  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let estimatedPayoff = '';

  for (let i = 1; i <= numOfPayments; i++) {
    const interestOfMonth = remainingBalance * monthlyInterestRate;
    const principal = monthlyPayment - interestOfMonth;

    totalInterest += interestOfMonth;
    remainingBalance -= principal;

    const { month, year } = getMonthYear(startingDate, i);

    estimatedPayoff = `${month} ${year}`;

    if (!data[year]) {
      data[year] = { rows: [], totals: {} };
      data[year].totals = {
        payment: 0,
        principal: 0,
        interest: 0,
        remainingBalance: 0,
      };
    }

    // Monthly record
    data[year].rows.push(
      reduceDecimalsFromObject({
        month: `${month.slice(0, 3)} ${year}`,
        payment: monthlyPayment,
        principal,
        interest: interestOfMonth,
        remainingBalance: Math.abs(remainingBalance),
      })
    );

    // Total of year record
    data[year].totals.payment += monthlyPayment;
    data[year].totals.principal += principal;
    data[year].totals.interest += interestOfMonth;
    data[year].totals.remainingBalance = Math.abs(remainingBalance);

    data[year].totals = reduceDecimalsFromObject(data[year].totals);
  }

  return { data, monthlyPayment, totalInterest, estimatedPayoff };
};

// Get month and year formatted as 'January 2024'
const getMonthYear = (startDate, monthOffset) => {
  // Create a new Date object based on the starting date
  const date = new Date(startDate);

  // Add the monthOffset to the date's month
  date.setMonth(date.getMonth() + monthOffset);

  // Get the month name and the full year
  const monthNames = [
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return { month, year };
};

export default calculateLoanContribution;
