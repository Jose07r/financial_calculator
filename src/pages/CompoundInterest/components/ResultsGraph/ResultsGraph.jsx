import { useInterestContext } from '@/contexts/InterestContext/InterestContext';

import Box from '@components/ui/Box/Box';
import Graphs from '@pages/CompoundInterest/components/Graphs/Graphs';
import Loader from '@components/ui/Loader/Loader';

import styles from '@pages/CompoundInterest/components/ResultsGraph/ResultsGraph.module.css';

function ResultsGraph({ isLoading }) {
  let dataResults = null;
  const { results } = useInterestContext();
  if (results) dataResults = results.data;

  return (
    <Box customClass="graphs-box">
      {isLoading ? (
        <Loader />
      ) : dataResults ? (
        <Graphs results={dataResults}></Graphs>
      ) : (
        <p className={styles['starting_message']}>
          Fill out the form to see the results.
        </p>
      )}
    </Box>
  );
}

export default ResultsGraph;
