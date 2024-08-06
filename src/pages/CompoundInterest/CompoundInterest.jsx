import { useState } from 'react';
import NavBar from '@components/layout/NavBar/NavBar';
import InterestForm from '@components/compound_interest/InterestForm/InterestForm';
import ResultsGraph from '@components/compound_interest/ResultsGraph/ResultsGraph';
import ResultsSummary from '@components/compound_interest/ResultsSummary/ResultsSummary';
import { InterestProvider } from '@/contexts/InterestContext';
import Footer from '@components/layout/Footer/Footer';

import styles from '@pages/CompoundInterest/CompoundInterest.module.css';

function CompoundInterest() {
  // Simulate loading state since we are not fetching data
  const [isLoading, setIsLoading] = useState(false);

  return (
    <InterestProvider>
      <NavBar />
      <main className={styles.main}>
        <h1 className={styles.h1}>Compound Interest Calculator</h1>
        <p className={styles['text_intro']}>
          <span>&bull; Financial Growth Made Simple:</span> Calculate how your
          money grows over time with our easy-to-use compound interest
          calculator.
        </p>
        <div className={styles['box_container']}>
          <InterestForm setIsLoading={setIsLoading} />
          <ResultsGraph isLoading={isLoading} />
        </div>
        <ResultsSummary isLoading={isLoading} />
        <div className={styles['compound_definition']}>
          <h2>What is compound interest?</h2>
          <p>
            Compound interest is the interest calculated on the initial
            principal and the accumulated interest from previous periods. This
            method causes interest to accrue on both the original amount and the
            interest already earned, leading to exponential growth over time.
          </p>
        </div>
      </main>
      <Footer />
    </InterestProvider>
  );
}

export default CompoundInterest;
