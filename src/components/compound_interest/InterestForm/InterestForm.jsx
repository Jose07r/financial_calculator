import Box from '@components/ui/Box/Box';
import MoneyInput from '@components/ui/MoneyInput/MoneyInput';
import RangeInput from '@components/ui/RangeInput/RangeInput';
import Button from '@components/ui/Button/Button';

import styles from '@components/compound_interest/InterestForm/InterestForm.module.css';

function InterestForm({ setIsLoading, getContext }) {
  const {
    startingAmount,
    monthlyContribution,
    yearsOfInvesting,
    annualInterest,
    dispatch,
  } = getContext();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
    dispatch({ type: 'onCalculate' });
  }

  return (
    <Box customClass="form-box">
      <form onSubmit={handleSubmit} className={styles['form']}>
        <div className={styles['inputs_container']}>
          <MoneyInput
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
            labelText="Monthly contribution"
            inputValue={monthlyContribution.formattedValue}
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
        </div>
        <Button btnText="Calculate" />
      </form>
    </Box>
  );
}

export default InterestForm;
