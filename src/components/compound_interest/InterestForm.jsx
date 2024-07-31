import Box from '@components/ui/Box';
import MoneyInput from '@components/ui/MoneyInput';
import RangeInput from '@components/ui/RangeInput';
import Button from '@components/ui/Button';
import { useInterestContext } from '@/contexts/InterestContext';

import styles from '@components/compound_interest/InterestForm.module.css';

function InterestForm() {
  const {
    startingAmount,
    monthlyContribution,
    yearsOfInvesting,
    annualInterest,
    dispatch,
  } = useInterestContext();

  const formattedStartingAmount = startingAmount.formattedValue;
  const formattedMonthlyContribution = monthlyContribution.formattedValue;

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: 'onCalculate' });
  }

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <MoneyInput
          labelText="Starting amount"
          inputValue={formattedStartingAmount}
          onChangeFn={(e) => {
            dispatch({
              type: 'onStartingAmountChange',
              payload: e.target.value,
            });
          }}
        />
        <MoneyInput
          labelText="Monthly contribution"
          inputValue={formattedMonthlyContribution}
          onChangeFn={(e) => {
            dispatch({
              type: 'onMonthlyContributionChange',
              payload: e.target.value,
            });
          }}
        />
        <RangeInput
          labelText="Years of investing"
          inputValue={yearsOfInvesting}
          valueType="years"
          minValue={1}
          maxValue={30}
          onChangeFn={(value) => {
            dispatch({
              type: 'onNumOfYearsChange',
              payload: Number(value),
            });
          }}
        />
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
        <Button btnText="Calculate" />
      </form>
    </Box>
  );
}

export default InterestForm;
