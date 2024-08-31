import styles from '@components/ui/NumberInput/NumberInput.module.css';

function NumberInput({
  customClass = '',
  inputLabel,
  percentage = false,
  minValue,
  maxValue,
  decimalAllowed = false,
  inputValue,
  dispatch,
  dispatchType,
}) {
  // Prevent typing nom-numeric characters
  const handleKeyDown = (event) => {
    const validKeys = [
      'Backspace',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      ...(decimalAllowed ? ['.'] : []),
    ]; //Allow this keys only
    if (!validKeys.includes(event.key)) {
      event.preventDefault(); // Prevent default action for invalid keys
    }
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;

    if (inputValue !== '') {
      inputValue = parseFloat(inputValue).toFixed(2);
      const numericValue = parseFloat(inputValue);

      if (numericValue > maxValue) {
        inputValue = maxValue;
      } else {
        inputValue = numericValue;
      }
    }
    dispatch({ type: dispatchType, payload: inputValue });
  };
  return (
    <div className={`${styles['input_container']} ${customClass}`}>
      <label className={styles['input_label']} htmlFor="number_input">
        * {inputLabel}{' '}
        <span>
          &#40;max-{maxValue}
          {percentage && '%'}&#41;
        </span>
      </label>
      <div>
        <input
          className={styles['input']}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={(e) => e.preventDefault()}
          type="number"
          id="number_input"
          min={minValue}
          max={maxValue}
          inputMode="numeric"
          value={inputValue}
          placeholder="0"
          step={decimalAllowed ? 0.01 : 1}
          required
        />
        {percentage && <span className="percentage_label">%</span>}
      </div>
    </div>
  );
}

export default NumberInput;
