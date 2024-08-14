import styles from '@components/ui/NumberInput/NumberInput.module.css';

function NumberInput({
  customClass,
  inputLabel,
  inputAdvice = '',
  minValue,
  maxValue,
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
    ]; //Allow this keys only
    if (!validKeys.includes(event.key)) {
      event.preventDefault(); // Prevent default action for invalid keys
    }
  };

  const handleChange = (event) => {
    let inputValue = event.target.value;

    if (inputValue !== '') {
      const numericValue = parseInt(inputValue, 10);

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
        * {inputLabel} <span>&#40;max-{maxValue}&#41;</span>
      </label>
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
        required
      />
    </div>
  );
}

export default NumberInput;
