// P = Starting amount(principal) M = Monthly contribution  n = Number of years of investing  r = Annual interest rate
function calculateInterest(P, M, n, r) {
  // Convert annual rate to monthly rate
  let i = r / 12;
  // Total number of months
  let t = n * 12;

  let data = {
    monthly: [],
    yearly: [],
  };
  // Expected output
  // [
  //  {
  // month/year: Number of month/year,
  // principal: Starting amount,
  // contributions: Contributions,
  // interest: Interest gained,
  // accrued_contributions: Accrued contributions,
  // accrued_interest: Accrued interests
  // balance: Total balance
  //  }
  // ]

  // Initialize current balance
  let currentBalance = P;

  // Loop through each month
  for (let month = 1; month <= t; month++) {
    // Calculate interest for the month
    let interestForMonth = currentBalance * i;

    // Add the monthly contribution
    currentBalance += M;

    // Add the interest to the balance
    currentBalance += interestForMonth;

    // Monthly record
    const interest = reduceDecimals(interestForMonth);
    const accrued_contributions = month * M;
    const accrued_interest =
      month === 1
        ? reduceDecimals(interestForMonth)
        : reduceDecimals(
            data.monthly
              .map((obj) => obj.interest)
              .reduce((prev, curr) => prev + curr, 0) + interest
          );
    const balance = reduceDecimals(
      P + accrued_contributions + accrued_interest
    );

    const monthlyRecord = {
      month,
      principal: P,
      contributions: M,
      interest,
      accrued_contributions,
      accrued_interest,
      balance,
    };

    data.monthly.push(monthlyRecord);

    // Yearly record
    if (month % 12 === 0) {
      const interest = parseFloat(
        accrued_interest -
          (month === 12 ? 0 : data.monthly[month - 13].accrued_interest)
      ).toFixed(2);

      const yearlyRecord = {
        year: month / 12,
        principal: P,
        contributions: M * 12,
        interest,
        accrued_contributions,
        accrued_interest,
        balance,
      };

      data.yearly.push(yearlyRecord);
    }
  }

  return data;
}

function reduceDecimals(num) {
  return parseFloat(num.toFixed(2));
}

export default calculateInterest;
