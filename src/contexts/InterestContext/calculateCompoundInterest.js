import reduceDecimalsFromObject from '@/utils/reduceDecimalsFromObject';

function calculateInterest(
  startingAmount,
  contributions,
  monthsOfInvesting,
  annualInterestRate
) {
  // Convert annual rate to monthly rate
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  let data = {
    monthly: [],
    yearly: [],
  };

  // Initialize variables
  let balance = startingAmount;
  let accrued_contributions = 0;
  let accrued_interest = 0;

  // Loop through each month
  for (let month = 1; month <= monthsOfInvesting; month++) {
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
    const remainingMonths = month % 12;
    if (remainingMonths === 0) {
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
    } else {
      if (monthsOfInvesting === month) {
        const interestForYear =
          accrued_interest -
          (month <= 12
            ? 0
            : data.monthly[month - (remainingMonths + 1)].accrued_interest);

        data.yearly.push(
          reduceDecimalsFromObject({
            year: Math.ceil(month / 12),
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
  }

  const finalSummary = reduceDecimalsFromObject({
    startingAmount,
    accrued_contributions,
    accrued_interest,
    balance,
  });

  return {
    data,
    ...finalSummary,
  };
}

export default calculateInterest;
