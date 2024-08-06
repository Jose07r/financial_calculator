import styles from '@components/ui/Loader/Loader.module.css';

function Spinner() {
  return (
    <div className={styles['loader_container']}>
      <span className={styles['loader']}></span>
    </div>
  );
}

export default Spinner;
