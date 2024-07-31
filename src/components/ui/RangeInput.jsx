import styles from '@components/ui/RangeInput.module.css';
import Slider from 'rc-slider';

function RangeInput({
  labelText,
  inputValue,
  valueType,
  minValue,
  maxValue,
  onChangeFn,
}) {
  return (
    <div className={styles['container']}>
      <div className={styles['label_container']}>
        <label className={styles['input_label']} htmlFor="range-input">
          {labelText}
        </label>
        <span className={styles['input_value']}>
          {inputValue} {valueType}
        </span>
      </div>
      <Slider
        min={minValue}
        max={maxValue}
        step={1}
        onChange={(value) => onChangeFn(value)}
        startPoint={0}
        value={inputValue}
        styles={{
          handle: {
            left: `${(100 / maxValue) * inputValue}%`,
            transform: 'translate(-50%, -50%)',
          },
          track: {
            left: '0',
            width: `${(100 / maxValue) * inputValue}%`,
          },
        }}
      />
    </div>
  );
}

export default RangeInput;
