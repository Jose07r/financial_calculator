import { useLoanContext } from '@/contexts/LoanContext/LoanContext';

import Box from '@components/ui/Box/Box';
import Graphs from '@pages/LoanCalculator/components/Graphs/Graphs';
import Loader from '@components/ui/Loader/Loader';

import styles from '@pages/LoanCalculator/components/ResultsGraph/ResultsGraph.module.css';

function ResultsGraph({ isLoading }) {
  const { results } = useLoanContext();

  return (
    <Box customClass="graphs-box">
      {isLoading ? (
        <Loader />
      ) : results ? (
        <Graphs></Graphs>
      ) : (
        <p className={styles['starting_message']}>
          Fill out the form to see the results.
        </p>
      )}
    </Box>
  );
}

export default ResultsGraph;
