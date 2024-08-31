import { useSavingsContext } from '@/contexts/SavingsContext/SavingsContext';
import { useEffect, useState } from 'react';

import Box from '@components/ui/Box/Box';
import MoneyInput from '@components/ui/MoneyInput/MoneyInput';
import RadioInput from '@components/ui/RadioInput/RadioInput';
import NumberInput from '@components/ui/NumberInput/NumberInput';
import RangeInput from '@components/ui/RangeInput/RangeInput';
import Button from '@components/ui/Button/Button';

import styles from '@pages/SavingsGoal/components/SavingsForm/SavingsForm.module.css';

function SavingsForm({ setIsLoading, calculationType, setCalculationType }) {
  const {
    initialBalance,
    savingsGoal,
    monthlyContribution,
    deadline,
    annualInterest,
    dispatch,
  } = useSavingsContext();

  const [formError, setFormError] = useState(null);

  // To calculate savings goal
  function handleSubmit(e) {
    e.preventDefault();
    // Only calculate if there is no validation errors.
    if (!formError) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
      dispatch({ type: 'onCalculate', payload: calculationType });
    }
  }

  // Prevent from passing 0 to specific fields
  useEffect(() => {
    if (initialBalance.raw === 0 && savingsGoal.raw === 0) {
      setFormError({
        message: '* Initial balance and Savings goal cannot both be set to 0',
        type: 'amount',
      });
    } else if (deadline.years === 0 && deadline.months === 0) {
      setFormError({ message: '* Please enter a deadline.', type: 'deadline' });
    }

    return () => setFormError(null);
  }, [initialBalance, savingsGoal, deadline]);

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['inputs_container']}>
          <MoneyInput
            customClass={
              formError && formError.type === 'amount' ? 'error' : ''
            }
            labelText="Initial balance"
            inputValue={initialBalance.formattedValue}
            onChangeFn={(e) => {
              dispatch({
                type: 'onInitialBalanceChange',
                payload: e.target.value,
              });
            }}
          />
          <MoneyInput
            customClass={
              formError && formError.type === 'amount' ? 'error' : ''
            }
            labelText="Savings goal"
            inputValue={savingsGoal.formattedValue}
            onChangeFn={(e) => {
              dispatch({
                type: 'onSavingsGoalChange',
                payload: e.target.value,
              });
            }}
          />
          <div className={styles['multi_input']}>
            <RadioInput
              legend="Years to reach goal"
              values={['contribution', 'time']}
              labels={['set deadline', 'as soon as possible']}
              radioName="goal"
              setRadioValue={setCalculationType}
            />

            {calculationType === 'contribution' ? (
              <div className={styles['number_input_container']}>
                <NumberInput
                  customClass={`child${
                    formError && formError.type === 'deadline' ? ' error' : ''
                  }`}
                  inputLabel="Years"
                  minValue={0}
                  maxValue={60}
                  inputValue={deadline.years}
                  dispatch={dispatch}
                  dispatchType="onYearsChange"
                />
                <NumberInput
                  customClass={`child${
                    formError && formError.type === 'deadline' ? ' error' : ''
                  }`}
                  inputLabel="Months"
                  minValue={0}
                  maxValue={12}
                  inputValue={deadline.months}
                  dispatch={dispatch}
                  dispatchType="onMonthsChange"
                />
              </div>
            ) : (
              <MoneyInput
                customClass="child"
                labelText="Monthly contributions"
                inputValue={monthlyContribution.formattedValue}
                onChangeFn={(e) => {
                  dispatch({
                    type: 'onMonthlyContributionChange',
                    payload: e.target.value,
                  });
                }}
              />
            )}
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

export default SavingsForm;
