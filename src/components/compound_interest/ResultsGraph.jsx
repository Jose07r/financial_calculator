import Box from '@components/ui/Box';
import Graphs from '@components/compound_interest/Graphs';
import { useInterestContext } from '@/contexts/InterestContext';

import styles from '@components/compound_interest/ResultsGraph.module.css';

function ResultsGraph() {
  const { results } = useInterestContext();
  return (
    <Box customClass="graphs-box">
      {results ? (
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
