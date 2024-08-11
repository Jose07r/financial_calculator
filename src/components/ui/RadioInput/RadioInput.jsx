import styles from '@components/ui//RadioInput/RadioInput.module.css';

function RadioInput({
  legend,
  values: [val1, val2],
  labels: [label1, label2],
  radioName,
  setRadioValue,
}) {
  return (
    <div className={styles['radio_group']}>
      <p className={styles['radio_legend']}>{legend}</p>
      <div className={styles['inputs_container']}>
        <label className={styles['radio_container']}>
          {label1}
          <input
            className={styles['radio_input']}
            onInput={(e) => setRadioValue(e.target.value)}
            type="radio"
            name={radioName}
            value={val1}
            defaultChecked
          />
          <span className={styles['radio_marker']}></span>
        </label>

        <label className={styles['radio_container']}>
          {label2}
          <input
            className={styles['radio_input']}
            onInput={(e) => setRadioValue(e.target.value)}
            type="radio"
            name={radioName}
            value={val2}
          />
          <span className={styles['radio_marker']}></span>
        </label>
      </div>
    </div>
  );
}

export default RadioInput;
