import reduceDecimalsFromObject from '@/utils/reduceDecimalsFromObject';

// Calculate the required monthly contributions to reach goal
function calculateContributions(
  initialBalance,
  savingsGoal,
  monthsToGoal,
  annualInterestRate
) {
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  let contributions;

  if (monthlyInterestRate === 0) {
    contributions = (savingsGoal - initialBalance) / monthsToGoal;
  } else {
    // Formula for getting required monthly contribution
    contributions =
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

    balance += interestForMonth + contributions;

    accrued_contributions += contributions;
    accrued_interest += interestForMonth;

    // Monthly record
    data.monthly.push(
      reduceDecimalsFromObject({
        month,
        principal: initialBalance,
        contributions,
        interest: interestForMonth,
        accrued_contributions,
        accrued_interest,
        balance,
      })
    );
  }

  return data;
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
    let interestGained = balance * monthlyInterestRate;
    balance += interestGained + monthlyContribution;
    accruedContributions += monthlyContribution;
    accruedInterest += interestGained;

    data.monthly.push(
      reduceDecimalsFromObject({
        month: month,
        principal: initialBalance,
        contributions: monthlyContribution,
        interest: interestGained,
        accrued_contributions: accruedContributions,
        accrued_interest: accruedInterest,
        balance: balance,
      })
    );
  }

  const yearsToGoal = Math.floor(month / 12);
  const monthsRemaining = month % 12;
  return { yearsToGoal, monthsRemaining, data };
}

export { calculateContributions, calculateYearsToGoal };
