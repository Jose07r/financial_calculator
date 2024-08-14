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
  deadline: {
    years: '',
    months: '',
  },
  annualInterest: 0,
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'onInitialBalanceChange': {
      const inputValue = action.payload;

      // Return an empty string when input is empty
      if (inputValue === '') {
        return {
          ...state,
          initialBalance: { raw: null, formattedValue: '' },
        };
      }

      const parsedValue = parseNumber(inputValue);

      // Return an empty string when input cant be parsed as a number
      if (isNaN(parsedValue)) {
        return {
          ...state,
          initialBalance: { raw: null, formattedValue: '' },
        };
      }

      // Return the parsed and formatted value
      return {
        ...state,
        initialBalance: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onSavingsGoalChange': {
      const inputValue = action.payload;
      if (inputValue === '') {
        return {
          ...state,
          savingsGoal: { raw: null, formattedValue: '' },
        };
      }

      const parsedValue = parseNumber(inputValue);

      if (isNaN(parsedValue)) {
        return {
          ...state,
          savingsGoal: { raw: null, formattedValue: '' },
        };
      }

      return {
        ...state,
        savingsGoal: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onMonthlyContributionChange': {
      const inputValue = action.payload;
      if (inputValue === '') {
        return {
          ...state,
          monthlyContribution: { raw: null, formattedValue: '' },
        };
      }

      const parsedValue = parseNumber(inputValue);

      if (isNaN(parsedValue)) {
        return {
          ...state,
          monthlyContribution: { raw: null, formattedValue: '' },
        };
      }

      return {
        ...state,
        monthlyContribution: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onYearsChange': {
      return {
        ...state,
        deadline: {
          ...state.deadline,
          years: action.payload,
        },
      };
    }
    case 'onMonthsChange': {
      return {
        ...state,
        deadline: {
          ...state.deadline,
          months: action.payload,
        },
      };
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
          state.deadline.years * 12 + state.deadline.months,
          state.annualInterest
        );

        return {
          ...state,
          results: {
            calculationType: action.payload,
            yearsToGoal: state.deadline.years,
            monthsRemaining: state.deadline.months,
            data: { ...data },
          },
        };
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
            calculationType: action.payload,
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
      deadline,
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
        deadline,
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
