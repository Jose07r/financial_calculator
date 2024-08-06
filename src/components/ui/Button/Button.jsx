import styles from '@components/ui/Button/Button.module.css';

function Button({ btnText }) {
  return <button className={styles['btn']}>{btnText}</button>;
}

export default Button;
