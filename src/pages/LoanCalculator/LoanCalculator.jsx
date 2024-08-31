import { LoanProvider } from '@/contexts/LoanContext/LoanContext';
import { useState } from 'react';

import NavBar from '@components/layout/NavBar/NavBar';
import Main from '@components/layout/Main/Main';
import Footer from '@components/layout/Footer/Footer';
import LoanForm from '@pages/LoanCalculator/components/LoanForm/LoanForm';
import ResultsGraph from '@pages/LoanCalculator/components/ResultsGraph/ResultsGraph';
import ResultsSummary from '@pages/LoanCalculator/components/ResultsSummary/ResultsSummary';

import styles from '@pages/Main.module.css';

function LoanCalculator() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoanProvider>
      <NavBar />
      <Main customClass={styles['main']}>
        <>
          <h1 className={styles.h1}>Loan Calculator</h1>
          <p className={styles['text_intro']}>
            <span>&bull; Simplify your loan planning.</span> Use our loan
            calculator to visualize your repayment plan and stay on top of your
            finances.
          </p>
          <div className={`${styles['box_container']} savings`}>
            <LoanForm setIsLoading={setIsLoading} />
            <ResultsGraph isLoading={isLoading} />
            <ResultsSummary isLoading={isLoading} />
          </div>

          <div className={styles['content_bottom']}>
            <p>
              Our loan calculator is here to help you budget effectively by
              showing you your monthly payments and total interest. It
              simplifies your loan planning, giving you the clarity needed to
              manage your finances wisely.
            </p>
          </div>
        </>
      </Main>
      <Footer />
    </LoanProvider>
  );
}

export default LoanCalculator;
