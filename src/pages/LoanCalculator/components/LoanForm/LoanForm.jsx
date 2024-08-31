import { useLoanContext } from '@/contexts/LoanContext/LoanContext';
import { useState, useEffect } from 'react';

import Box from '@components/ui/Box/Box';
import MoneyInput from '@components/ui/MoneyInput/MoneyInput';
import NumberInput from '@components/ui/NumberInput/NumberInput';
import Button from '@components/ui/Button/Button';

import styles from '@pages/LoanCalculator/components/LoanForm/LoanForm.module.css';

function LoanForm({ setIsLoading }) {
  const { loanAmount, loanTerm, annualInterest, dispatch } = useLoanContext();

  const [formError, setFormError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    // Only calculate if there is no validation errors.
    if (!formError) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
      dispatch({ type: 'onCalculate' });
    }
  }

  // Prevent from passing 0 to specific fields
  useEffect(() => {
    if (loanAmount.raw === 0) {
      setFormError({
        message: '* Please enter a loan amount',
        type: 'loanAmount',
      });
    } else if (loanTerm.years === 0 && loanTerm.months === 0) {
      setFormError({
        message: '* Please enter a valid loan term.',
        type: 'loanTerm',
      });
    }

    return () => setFormError(null);
  }, [loanAmount, loanTerm]);

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['inputs_container']}>
          <MoneyInput
            customClass={formError?.type === 'loanAmount' ? 'error' : ''}
            labelText="Loan amount"
            inputValue={loanAmount.formattedValue}
            onChangeFn={(e) => {
              dispatch({
                type: 'onLoanAmountChange',
                payload: e.target.value,
              });
            }}
          />
          <div className={styles['loan_term_container']}>
            <span className={styles['loan_term_label']}>Loan term</span>
            <div className={styles['number_input_container']}>
              <NumberInput
                customClass={`child${
                  formError?.type === 'loanTerm' ? ' error' : ''
                }`}
                inputLabel="Years"
                minValue={0}
                maxValue={40}
                inputValue={loanTerm.years}
                dispatch={dispatch}
                dispatchType="onYearsChange"
              />
              <NumberInput
                customClass={`child${
                  formError?.type === 'loanTerm' ? ' error' : ''
                }`}
                inputLabel="Months"
                minValue={0}
                maxValue={12}
                inputValue={loanTerm.months}
                dispatch={dispatch}
                dispatchType="onMonthsChange"
              />
            </div>
          </div>
          <div className={styles['annual_interest_container']}>
            <NumberInput
              inputLabel="Annual interest rate"
              percentage={true}
              minValue={0}
              maxValue={100}
              decimalAllowed={true}
              inputValue={annualInterest}
              dispatch={dispatch}
              dispatchType="onInterestRateChange"
            />
          </div>
        </div>
        <p className={`${styles['error_text']}${formError ? ' show' : ''}`}>
          {formError && formError.message}
        </p>
        <Button btnText="Calculate" btnType="primary" />
      </form>
    </Box>
  );
}

export default LoanForm;
