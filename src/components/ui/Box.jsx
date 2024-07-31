import styles from '@components/ui/Box.module.css';

function Box({ children, customClass = '' }) {
  return <div className={`${styles['box']} ${customClass}`}>{children}</div>;
}

export default Box;
