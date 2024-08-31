import AmortizationTable from '@pages/LoanCalculator/components/AmortizationTable/AmortizationTable';

import styles from '@pages/LoanCalculator/components/Graphs/Graphs.module.css';

function Graphs() {
  return (
    <div className={styles['graphs_container']}>
      <div className={styles['controls_container']}></div>
      <h3 className={styles['graph_title']}>Amortization schedule</h3>
      <AmortizationTable />
    </div>
  );
}

export default Graphs;
