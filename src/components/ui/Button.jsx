import styles from '@components/ui/Button.module.css';

function Button({ btnText }) {
  return <button className={styles['btn']}>{btnText}</button>;
}

export default Button;
