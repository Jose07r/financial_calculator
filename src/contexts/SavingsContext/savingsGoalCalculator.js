import reduceDecimalsFromObject from '@/utils/reduceDecimalsFromObject';

// Calculate the required monthly contribution to reach goal
function calculateContribution(
  initialBalance,
  savingsGoal,
  monthsToGoal,
  annualInterestRate
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  let monthlyContribution;

  if (monthlyInterestRate === 0) {
    monthlyContribution = (savingsGoal - initialBalance) / monthsToGoal;
  } else {
    // Formula for calculating required monthly contribution
    monthlyContribution =
      (savingsGoal -
        initialBalance * Math.pow(1 + monthlyInterestRate, monthsToGoal)) /
      ((Math.pow(1 + monthlyInterestRate, monthsToGoal) - 1) /
        monthlyInterestRate);
  }

  let data = {
    monthly: [],
  };

  // Initialize variables
  let balance = initialBalance;
  let accrued_contributions = 0;
  let accrued_interest = 0;

  // Loop through each month
  for (let month = 1; month <= monthsToGoal; month++) {
    // Calculate interest for the month
    let interestForMonth = balance * monthlyInterestRate;

    balance += interestForMonth + monthlyContribution;

    accrued_contributions += monthlyContribution;
    accrued_interest += interestForMonth;

    // Monthly record
    data.monthly.push(
      reduceDecimalsFromObject({
        month,
        principal: initialBalance,
        monthlyContribution,
        interest: interestForMonth,
        accrued_contributions,
        accrued_interest,
        balance,
      })
    );
  }

  return {
    data,
    monthlyContribution: parseFloat(monthlyContribution.toFixed(2)),
  };
}

// Calculate the time when the goal will be reached
function calculateYearsToGoal(
  initialBalance,
  savingsGoal,
  monthlyContribution,
  annualInterestRate
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  let balance = initialBalance;
  let accruedContributions = 0;
  let accruedInterest = 0;

  // Initialize variables
  let month = 0;
  let data = {
    monthly: [],
  };

  // Loop until balance hits the goal
  while (balance < savingsGoal) {
    month++;
    let interestForMonth = balance * monthlyInterestRate;
    balance += interestForMonth + monthlyContribution;
    accruedContributions += monthlyContribution;
    accruedInterest += interestForMonth;

    data.monthly.push(
      reduceDecimalsFromObject({
        month: month,
        principal: initialBalance,
        monthlyContribution,
        interest: interestForMonth,
        accrued_contributions: accruedContributions,
        accrued_interest: accruedInterest,
        balance: balance,
      })
    );
  }

  const yearsToGoal = Math.floor(month / 12);
  const monthsRemaining = month % 12;
  return {
    yearsToGoal,
    monthsRemaining,
    totalSavings: parseFloat(balance.toFixed(2)),
    data,
  };
}

export { calculateContribution, calculateYearsToGoal };
