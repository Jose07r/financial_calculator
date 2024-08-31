import { createContext, useContext, useReducer } from 'react';
import { formatNumberWithCommas, parseNumber } from '@/utils/formatNumber';

import calculateLoanContribution from '@/contexts/LoanContext/calculateLoanContribution';

const LoanContext = createContext(null);

const initialSate = {
  loanAmount: {
    raw: null,
    formattedValue: '',
  },
  loanTerm: {
    years: '',
    months: 0,
  },
  annualInterest: 0,
  results: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'onLoanAmountChange': {
      const inputValue = action.payload;

      // Return an empty string when input is empty
      if (inputValue === '') {
        return {
          ...state,
          loanAmount: { raw: null, formattedValue: '' },
        };
      }

      const parsedValue = parseNumber(inputValue);

      // Return an empty string when input cant be parsed as a number
      if (isNaN(parsedValue)) {
        return {
          ...state,
          loanAmount: { raw: null, formattedValue: '' },
        };
      }

      // Return the parsed and formatted value
      return {
        ...state,
        loanAmount: {
          raw: parsedValue,
          formattedValue: formatNumberWithCommas(parsedValue),
        },
      };
    }
    case 'onYearsChange': {
      return {
        ...state,
        loanTerm: {
          ...state.loanTerm,
          years: action.payload,
        },
      };
    }
    case 'onMonthsChange': {
      return {
        ...state,
        loanTerm: {
          ...state.loanTerm,
          months: action.payload,
        },
      };
    }
    case 'onInterestRateChange': {
      return { ...state, annualInterest: action.payload };
    }
    case 'onCalculate': {
      const { data, monthlyPayment, totalInterest, estimatedPayoff } =
        calculateLoanContribution(
          state.loanAmount.raw,
          state.loanTerm.years * 12 + state.loanTerm.months,
          state.annualInterest
        );
      return {
        ...state,
        results: {
          final: {
            loanAmount: state.loanAmount.formattedValue,
            monthlyPayment: formatNumberWithCommas(
              parseFloat(monthlyPayment.toFixed(2))
            ),
            interestRate: state.annualInterest.toFixed(1),
            numOfPayments: state.loanTerm.years * 12 + state.loanTerm.months,
            totalInterest: formatNumberWithCommas(
              parseFloat(totalInterest.toFixed(2))
            ),
            estimatedPayoff,
            toBeRepaid: formatNumberWithCommas(
              parseFloat((state.loanAmount.raw + totalInterest).toFixed(2))
            ),
          },
          data,
        },
      };
    }
    default: {
      throw new Error('Unknown action.');
    }
  }
}

function LoanProvider({ children }) {
  const [{ loanAmount, loanTerm, annualInterest, results }, dispatch] =
    useReducer(reducer, initialSate);

  return (
    <LoanContext.Provider
      value={{
        loanAmount,
        loanTerm,
        annualInterest,
        results,
        dispatch,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
}

function useLoanContext() {
  const context = useContext(LoanContext);
  if (context === undefined)
    throw new Error('useLoanContext used out of the LoanProvider.');
  return context;
}

export { LoanProvider, useLoanContext };
