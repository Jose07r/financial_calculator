import { useInterestContext } from '@/contexts/InterestContext/InterestContext';
import { useState, useEffect } from 'react';

import Box from '@components/ui/Box/Box';
import MoneyInput from '@components/ui/MoneyInput/MoneyInput';
import NumberInput from '@components/ui/NumberInput/NumberInput';
import Button from '@components/ui/Button/Button';

import styles from '@pages/CompoundInterest/components/InterestForm/InterestForm.module.css';

function InterestForm({ setIsLoading }) {
  const {
    startingAmount,
    monthlyContribution,
    investmentPeriod,
    annualInterest,
    dispatch,
  } = useInterestContext();

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
    if (startingAmount.raw === 0 && monthlyContribution.raw === 0) {
      setFormError({
        message: '* Starting amount and Contribution cannot both be set to 0',
        type: 'investmentAmount',
      });
    } else if (investmentPeriod.years === 0 && investmentPeriod.months === 0) {
      setFormError({
        message: '* Please enter a valid time of investing.',
        type: 'investmentPeriod',
      });
    }

    return () => setFormError(null);
  }, [startingAmount, monthlyContribution, investmentPeriod]);

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['inputs_container']}>
          <MoneyInput
            customClass={formError?.type === 'investmentAmount' ? 'error' : ''}
            labelText="Starting amount"
            inputValue={startingAmount.formattedValue}
            onChangeFn={(e) => {
              dispatch({
                type: 'onStartingAmountChange',
                payload: e.target.value,
              });
            }}
          />
          <MoneyInput
            customClass={formError?.type === 'investmentAmount' ? 'error' : ''}
            labelText="Monthly contribution"
            inputValue={monthlyContribution.formattedValue}
            onChangeFn={(e) => {
              dispatch({
                type: 'onMonthlyContributionChange',
                payload: e.target.value,
              });
            }}
          />
          <div className={styles['investmentPeriod_container']}>
            <span className={styles['investmentPeriod_label']}>
              Time of investing
            </span>
            <div className={styles['number_input_container']}>
              <NumberInput
                customClass={`child${
                  formError?.type === 'investmentPeriod' ? ' error' : ''
                }`}
                inputLabel="Years"
                minValue={0}
                maxValue={60}
                inputValue={investmentPeriod.years}
                dispatch={dispatch}
                dispatchType="onYearsChange"
              />
              <NumberInput
                customClass={`child${
                  formError?.type === 'investmentPeriod' ? ' error' : ''
                }`}
                inputLabel="Months"
                minValue={0}
                maxValue={12}
                inputValue={investmentPeriod.months}
                dispatch={dispatch}
                dispatchType="onMonthsChange"
              />
            </div>
          </div>
          <div className={styles['annual_interest_container']}>
            <NumberInput
              inputLabel="Annual interest rate"
              minValue={0}
              maxValue={100}
              percentage={true}
              inputValue={annualInterest}
              decimalAllowed={true}
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

export default InterestForm;
