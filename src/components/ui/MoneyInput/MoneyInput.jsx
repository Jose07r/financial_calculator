import { FaDollarSign } from 'react-icons/fa';
import styles from '@components/ui/MoneyInput/MoneyInput.module.css';

function MoneyInput({ customClass = '', labelText, inputValue, onChangeFn }) {
  return (
    <div className={`${styles['container']} ${customClass}`}>
      <label htmlFor="money-input" className={styles['input_label']}>
        * {labelText}
      </label>
      <div className={styles['input_container']}>
        <span className={styles['money_symbol']}>
          <FaDollarSign />
        </span>
        <input
          className={styles.input}
          id="money-input"
          type="text"
          inputMode="numeric"
          placeholder="0.00"
          value={inputValue}
          maxLength={10}
          required
          onChange={onChangeFn}
        />
      </div>
    </div>
  );
}

export default MoneyInput;
