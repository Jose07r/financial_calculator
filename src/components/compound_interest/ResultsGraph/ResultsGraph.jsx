import Box from '@components/ui/Box/Box';
import Graphs from '@components/compound_interest/Graphs/Graphs';
import Loader from '@components/ui/Loader/Loader';
import { useInterestContext } from '@/contexts/InterestContext';

import styles from '@components/compound_interest/ResultsGraph/ResultsGraph.module.css';

function ResultsGraph({ isLoading }) {
  const { results } = useInterestContext();

  return (
    <Box customClass="graphs-box">
      {isLoading ? (
        <Loader />
      ) : results ? (
        <Graphs />
      ) : (
        <p className={styles['starting_message']}>
          Fill out the form to see the results.
        </p>
      )}
    </Box>
  );
}

export default ResultsGraph;
