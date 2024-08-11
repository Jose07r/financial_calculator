import Box from '@components/ui/Box/Box';
import MoneyInput from '@components/ui/MoneyInput/MoneyInput';
import RangeInput from '@components/ui/RangeInput/RangeInput';
import RadioInput from '@components/ui/RadioInput/RadioInput';
import Button from '@components/ui/Button/Button';

import styles from '@components/savings_goal/SavingsForm/SavingsForm.module.css';

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
    yearsToReachGoal,
    annualInterest,
    dispatch,
  } = getContext();

  // To calculate savings goal
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
    dispatch({ type: 'onCalculate', payload: calculationType });
  }

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['inputs_container']}>
          <MoneyInput
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
              labels={['years', 'as soon as possible']}
              radioName="goal"
              setRadioValue={setCalculationType}
            />

            {calculationType === 'contribution' ? (
              <RangeInput
                customClass="radio_children"
                inputValue={yearsToReachGoal}
                valueType="years"
                minValue={1}
                maxValue={30}
                onChangeFn={(value) => {
                  dispatch({
                    type: 'onYearsToReachGoalChange',
                    payload: Number(value),
                  });
                }}
              />
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
        <Button btnText="Calculate" />
      </form>
    </Box>
  );
}

export default SavingsForm;
