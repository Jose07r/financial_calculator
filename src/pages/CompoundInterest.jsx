import styles from '@pages/CompoundInterest.module.css';
import NavBar from '@components/layout/NavBar';
import InterestForm from '@components/compound_interest/InterestForm';
import ResultsGraph from '@components/compound_interest/ResultsGraph';
import ResultsSummary from '@components/compound_interest/ResultsSummary';
import { InterestProvider } from '@/contexts/InterestContext';
import Footer from '@components/layout/Footer';

function CompoundInterest() {
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
        <div>
          <div className={styles['box_container']}>
            <InterestForm />
            <ResultsGraph />
          </div>
          <ResultsSummary />
        </div>
      </main>
      <Footer />
    </InterestProvider>
  );
}

export default CompoundInterest;
