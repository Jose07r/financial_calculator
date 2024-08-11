import Box from '@components/ui/Box/Box';
import Graphs from '@components/savings_goal/Graphs/Graphs';
import Loader from '@components/ui/Loader/Loader';

import styles from '@components/savings_goal/ResultsGraph/ResultsGraph.module.css';

function ResultsGraph({ isLoading, getContext }) {
  let dataResults = null;
  const { results } = getContext();
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
