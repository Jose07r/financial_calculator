import { useState } from 'react';
import {
  SavingsProvider,
  useSavingsContext,
} from '@/contexts/SavingsContext/SavingsContext';

import NavBar from '@components/layout/NavBar/NavBar';
import Main from '@components/layout/Main/Main';
import Footer from '@components/layout/Footer/Footer';
import SavingsForm from '@components/savings_goal/SavingsForm/SavingsForm';
import ResultsGraph from '@components/savings_goal/ResultsGraph/ResultsGraph';
import ResultsSummary from '@components/savings_goal/ResultsSummary/ResultsSummary';

import styles from '@pages/Main.module.css';

function SavingsGoal() {
  const [isLoading, setIsLoading] = useState(false);
  // time: How long will take to reach goal || contribution: Monthly contribution required to reach goal
  const [calculationType, setCalculationType] = useState('contribution');

  return (
    <SavingsProvider>
      <NavBar />
      <Main customClass={styles['main']}>
        <>
          <h1 className={styles.h1}>Savings Goal Calculator</h1>
          <p className={styles['text_intro']}>
            <span>&bull; Achieve your savings goals faster.</span> Let our tool
            guide you on how much to save to reach your financial goals.
          </p>
          <div className={`${styles['box_container']} savings`}>
            <SavingsForm
              setIsLoading={setIsLoading}
              calculationType={calculationType}
              setCalculationType={setCalculationType}
              getContext={useSavingsContext}
            />
            <ResultsSummary
              isLoading={isLoading}
              getContext={useSavingsContext}
            />
            <ResultsGraph
              isLoading={isLoading}
              getContext={useSavingsContext}
            />
          </div>

          <div className={styles['content_bottom']}>
            <h2>How much to save each month?</h2>
            <p>
              To determine how much you need to save to reach your goal, input
              your target amount and the time frame you have. Our calculator
              will compute the monthly savings required, helping you plan your
              budget effectively and stay on track to achieve your financial
              objectives.
            </p>
          </div>
          <div className={styles['content_bottom']}>
            <h2>How long it will take to reach my goal?</h2>
            <p>
              To find out how long it will take to reach your savings goal,
              enter your target amount and your planned monthly contributions.
              Our tool will calculate the time needed to achieve your goal,
              providing you with a clear timeline and helping you stay motivated
              and organized.
            </p>
          </div>
        </>
      </Main>
      <Footer />
    </SavingsProvider>
  );
}

export default SavingsGoal;
