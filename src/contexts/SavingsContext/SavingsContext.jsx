import { createContext, useContext, useReducer } from 'react';
import { formatNumberWithCommas, parseNumber } from '@/utils/formatNumber';

import {
  calculateContributions,
  calculateYearsToGoal,
} from '@/contexts/SavingsContext/savingsGoalCalculator';

const SavingsContext = createContext(null);

const initialSate = {
  initialBalance: {
    raw: null,
    formattedValue: '',
  },
  savingsGoal: {
    raw: null,
    formattedValue: '',
  },
  monthlyContribution: {
    raw: null,
    formattedValue: '',
  },
  yearsToReachGoal: 1,
  annualInterest: 0,
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'onInitialBalanceChange': {
      const parsedValue = parseNumber(action.payload);

      if (!parsedValue)
        return { ...state, initialBalance: { raw: null, formattedValue: '' } };

      return {
        ...state,
        initialBalance: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onSavingsGoalChange': {
      const parsedValue = parseNumber(action.payload);

      if (!parsedValue)
        return {
          ...state,
          savingsGoal: { raw: null, formattedValue: '' },
        };

      return {
        ...state,
        savingsGoal: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onMonthlyContributionChange': {
      const parsedValue = parseNumber(action.payload);

      if (!parsedValue)
        return {
          ...state,
          monthlyContribution: { raw: null, formattedValue: '' },
        };

      return {
        ...state,
        monthlyContribution: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onYearsToReachGoalChange': {
      return { ...state, yearsToReachGoal: action.payload };
    }
    case 'onInterestRateChange': {
      return { ...state, annualInterest: action.payload };
    }
    case 'onCalculate': {
      // To calculate monthly contribution required to reach goal
      if (action.payload === 'contribution') {
        const data = calculateContributions(
          state.initialBalance.raw,
          state.savingsGoal.raw,
          state.yearsToReachGoal,
          state.annualInterest
        );

        return { ...state, results: { data: { ...data } } };
      }

      // To calculate time required to reach goal
      if (action.payload === 'time') {
        const { yearsToGoal, monthsRemaining, data } = calculateYearsToGoal(
          state.initialBalance.raw,
          state.savingsGoal.raw,
          state.monthlyContribution.raw,
          state.annualInterest
        );

        return {
          ...state,
          results: {
            yearsToGoal,
            monthsRemaining,
            data: { ...data },
          },
        };
      }
      break;
    }
    default: {
      throw new Error('Unknown action.');
    }
  }
}

function SavingsProvider({ children }) {
  const [
    {
      initialBalance,
      savingsGoal,
      monthlyContribution,
      yearsToReachGoal,
      annualInterest,
      results,
    },
    dispatch,
  ] = useReducer(reducer, initialSate);

  return (
    <SavingsContext.Provider
      value={{
        initialBalance,
        savingsGoal,
        monthlyContribution,
        yearsToReachGoal,
        annualInterest,
        results,
        dispatch,
      }}
    >
      {children}
    </SavingsContext.Provider>
  );
}

function useSavingsContext() {
  const context = useContext(SavingsContext);
  if (context === undefined)
    throw new Error('useSavingsContext used out of the SavingsProvider.');
  return context;
}

export { SavingsProvider, useSavingsContext };
