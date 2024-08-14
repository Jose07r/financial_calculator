import { createContext, useContext, useReducer } from 'react';
import { formatNumberWithCommas, parseNumber } from '@/utils/formatNumber';
import calculateInterest from '@/contexts/InterestContext/calculateCompoundInterest';

const InterestContext = createContext(null);

const initialSate = {
  startingAmount: {
    raw: null,
    formattedValue: '',
  },
  monthlyContribution: {
    raw: null,
    formattedValue: '',
  },
  yearsOfInvesting: 1,
  annualInterest: 0,
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'onStartingAmountChange': {
      const inputValue = action.payload;

      // Return an empty string when input is empty
      if (inputValue === '') {
        return {
          ...state,
          startingAmount: { raw: null, formattedValue: '' },
        };
      }

      const parsedValue = parseNumber(inputValue);

      // Return an empty string when input cant be parsed as a number
      if (isNaN(parsedValue)) {
        return {
          ...state,
          startingAmount: { raw: null, formattedValue: '' },
        };
      }

      // Return the parsed and formatted value
      return {
        ...state,
        startingAmount: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onMonthlyContributionChange': {
      const parsedValue = parseNumber(action.payload);

      if (parsedValue === 0) {
        return {
          ...state,
          monthlyContribution: { raw: 0, formattedValue: '0' },
        };
      }

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
    case 'onNumOfYearsChange': {
      return { ...state, yearsOfInvesting: action.payload };
    }
    case 'onInterestRateChange': {
      return { ...state, annualInterest: action.payload };
    }
    case 'onCalculate': {
      const data = calculateInterest(
        state.startingAmount.raw,
        state.monthlyContribution.raw,
        state.yearsOfInvesting,
        state.annualInterest
      );

      return {
        ...state,
        results: {
          data: {
            ...data,
          },
        },
      };
    }
    default: {
      throw new Error('Unknown action.');
    }
  }
}

function InterestProvider({ children }) {
  const [
    {
      startingAmount,
      monthlyContribution,
      yearsOfInvesting,
      annualInterest,
      results,
    },
    dispatch,
  ] = useReducer(reducer, initialSate);

  return (
    <InterestContext.Provider
      value={{
        startingAmount,
        monthlyContribution,
        yearsOfInvesting,
        annualInterest,
        results,
        dispatch,
      }}
    >
      {children}
    </InterestContext.Provider>
  );
}

function useInterestContext() {
  const context = useContext(InterestContext);
  if (context === undefined)
    throw new Error('useInterestContext used out of the InterestProvider.');
  return context;
}

export { InterestProvider, useInterestContext };
