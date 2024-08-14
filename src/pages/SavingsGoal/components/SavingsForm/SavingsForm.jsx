import Box from '@components/ui/Box/Box';
import MoneyInput from '@components/ui/MoneyInput/MoneyInput';
import RadioInput from '@components/ui/RadioInput/RadioInput';
import NumberInput from '@components/ui/NumberInput/NumberInput';
import RangeInput from '@components/ui/RangeInput/RangeInput';
import Button from '@components/ui/Button/Button';

import styles from '@pages/SavingsGoal/components/SavingsForm/SavingsForm.module.css';
import { useEffect, useState } from 'react';

function SavingsForm({
  setIsLoading,
  calculationType,
  setCalculationType,
  getContext,
}) {
  const {
    initialBalance,
    savingsGoal,
    monthlyContribution,
    deadline,
    annualInterest,
    dispatch,
  } = getContext();

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
        section: 1,
      });
    } else if (deadline.years === 0 && deadline.months === 0) {
      setFormError({ message: '* Please enter a deadline.', section: 2 });
    }

    return () => setFormError(null);
  }, [initialBalance, savingsGoal, deadline]);

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['inputs_container']}>
          <MoneyInput
            customClass={formError && formError.section === 1 ? 'error' : ''}
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
            customClass={formError && formError.section === 1 ? 'error' : ''}
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
                  customClass={`radio_children${
                    formError && formError.section === 2 ? ' error' : ''
                  }`}
                  inputLabel="Years"
                  minValue={0}
                  maxValue={30}
                  inputValue={deadline.years}
                  dispatch={dispatch}
                  dispatchType="onYearsChange"
                />
                <NumberInput
                  customClass={`radio_children${
                    formError && formError.section === 2 ? ' error' : ''
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
                customClass="radio_children"
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

          <RangeInput
            labelText="Annual interest rate"
            inputValue={annualInterest}
            valueType="%"
            minValue={0}
            maxValue={25}
            onChangeFn={(value) => {
              dispatch({
                type: 'onInterestRateChange',
                payload: Number(value),
              });
            }}
          />
        </div>
        <p className={`${styles['error_text']}${formError ? ' show' : ''}`}>
          {formError && formError.message}
        </p>
        <Button btnText="Calculate" />
      </form>
    </Box>
  );
}

export default SavingsForm;
