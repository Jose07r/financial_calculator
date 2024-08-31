import styles from '@components/ui/Button/Button.module.css';

function Button({ btnText, btnType, onClickFn }) {
  return (
    <button onClick={onClickFn} className={`${styles['btn']} ${btnType}`}>
      {btnText}
    </button>
  );
}

export default Button;
