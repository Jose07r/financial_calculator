import moneySymbol from '@images/icons/money-symbol.svg';
import styles from '@components/ui/MoneyInput/MoneyInput.module.css';

function MoneyInput({ labelText, inputValue, onChangeFn }) {
  return (
    <div className={styles['container']}>
      <label htmlFor="money-input" className={styles['input_label']}>
        * {labelText}
      </label>
      <div className={styles['input_container']}>
        <span className={styles['money_symbol']}>
          <img src={moneySymbol} alt="Money symbol" />
        </span>
        <input
          className={styles.input}
          id="money-input"
          type="text"
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
