import reduceDecimalsFromObject from '@/utils/reduceDecimalsFromObject';

function calculateInterest(
  startingAmount,
  contributions,
  years,
  annualInterestRate
) {
  // Convert annual rate to monthly rate
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  // Total number of months
  const months = years * 12;

  let data = {
    monthly: [],
    yearly: [],
  };

  // Initialize variables
  let balance = startingAmount;
  let accrued_contributions = 0;
  let accrued_interest = 0;

  // Loop through each month
  for (let month = 1; month <= months; month++) {
    // Calculate interest for the month
    let interestForMonth = balance * monthlyInterestRate;

    balance += interestForMonth + contributions;

    accrued_contributions += contributions;
    accrued_interest += interestForMonth;

    // Monthly record
    data.monthly.push(
      reduceDecimalsFromObject({
        month,
        principal: startingAmount,
        contributions,
        interest: interestForMonth,
        accrued_contributions,
        accrued_interest,
        balance,
      })
    );

    // Yearly record
    if (month % 12 === 0) {
      const interestForYear =
        accrued_interest -
        (month === 12 ? 0 : data.monthly[month - 13].accrued_interest);

      data.yearly.push(
        reduceDecimalsFromObject({
          year: month / 12,
          principal: startingAmount,
          contributions: contributions * 12,
          interest: interestForYear,
          accrued_contributions,
          accrued_interest,
          balance,
        })
      );
    }
  }

  return data;
}

export default calculateInterest;
