import { useState } from 'react';
import NavBar from '@components/layout/NavBar/NavBar';
import Main from '@components/layout/Main/Main';
import InterestForm from '@pages/CompoundInterest/components/InterestForm/InterestForm';
import ResultsGraph from '@pages/CompoundInterest/components/ResultsGraph/ResultsGraph';
import ResultsSummary from '@pages/CompoundInterest/components/ResultsSummary/ResultsSummary';
import Footer from '@components/layout/Footer/Footer';

import {
  InterestProvider,
  useInterestContext,
} from '@/contexts/InterestContext/InterestContext';

import styles from '@pages/Main.module.css';

function CompoundInterest() {
  // Simulate loading state since we are not fetching data
  const [isLoading, setIsLoading] = useState(false);

  return (
    <InterestProvider>
      <NavBar />
      <Main customClass={styles.main}>
        <>
          <h1 className={styles.h1}>Compound Interest Calculator</h1>
          <p className={styles['text_intro']}>
            <span>&bull; Financial Growth Made Simple:</span> Calculate how your
            money grows over time with our easy-to-use compound interest
            calculator.
          </p>
          <div className={styles['box_container']}>
            <InterestForm
              setIsLoading={setIsLoading}
              getContext={useInterestContext}
            />
            <ResultsGraph
              isLoading={isLoading}
              getContext={useInterestContext}
            />
          </div>
          <ResultsSummary
            isLoading={isLoading}
            getContext={useInterestContext}
          />
          <div className={styles['content_bottom']}>
            <h2>What is compound interest?</h2>
            <p>
              Compound interest is the interest calculated on the initial
              principal and the accumulated interest from previous periods. This
              method causes interest to accrue on both the original amount and
              the interest already earned, leading to exponential growth over
              time.
            </p>
          </div>
        </>
      </Main>
      <Footer />
    </InterestProvider>
  );
}

export default CompoundInterest;
