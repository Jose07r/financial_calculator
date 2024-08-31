import { useLoanContext } from '@/contexts/LoanContext/LoanContext';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

import { MdAccountBalance } from 'react-icons/md';
import { MdPercent } from 'react-icons/md';
import { LuCalendarClock } from 'react-icons/lu';
import { FaChartLine } from 'react-icons/fa6';
import { FaRegCheckCircle } from 'react-icons/fa';
import { GrNotes } from 'react-icons/gr';
import { FaMoneyBills } from 'react-icons/fa6';

import styles from '@pages/LoanCalculator/components/ResultsSummary/ResultsSummary.module.css';

function ResultsSummary({ isLoading }) {
  const { results } = useLoanContext();
  const [resultsIsVisible, setResultsIsVisible] = useState(false);

  const resultsRef = useRef(null);

  // Animate Results
  useEffect(() => {
    const resultsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setResultsIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) resultsObserver.unobserve(entry.target);
        console.log(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (resultsRef.current) resultsObserver.observe(resultsRef.current);

    return () => {
      setResultsIsVisible(false);
    };
  }, [results, isLoading]);

  // Card Item Info
  const loanAmount = results ? results.final.loanAmount : null;
  const interestRate = results ? results.final.interestRate : null;
  const numOfPayments = results ? results.final.numOfPayments : null;
  const totalInterest = results ? results.final.totalInterest : null;
  const estimatedPayOff = results ? results.final.estimatedPayoff : null;
  const totalToBeRepaid = results ? results.final.toBeRepaid : null;
  const monthlyPayment = results ? results.final.monthlyPayment : null;

  if (isLoading) {
    return;
  } else {
    return (
      <>
        {results && (
          <div className={styles['results_container']}>
            {/* Main Investment Performance */}
            <h2 className={styles['results_title']}>Results:</h2>
            {/* Cards */}
            <div className={styles['cards_container']} ref={resultsRef}>
              <CardItem
                animate={resultsIsVisible}
                image={<MdAccountBalance />}
                title="Loan amount"
                text={`$${loanAmount}`}
              />
              <CardItem
                animate={resultsIsVisible}
                image={<MdPercent />}
                title="Interest rate"
                text={`${interestRate}%`}
              />
              <CardItem
                animate={resultsIsVisible}
                image={<LuCalendarClock />}
                title="Number of payments"
                text={numOfPayments}
              />
              <CardItem
                animate={resultsIsVisible}
                image={<FaChartLine />}
                title="Total interest paid"
                text={`$${totalInterest}`}
              />
              <CardItem
                animate={resultsIsVisible}
                image={<FaRegCheckCircle />}
                title="Estimated payoff"
                text={estimatedPayOff}
              />
              <CardItem
                animate={resultsIsVisible}
                image={<GrNotes />}
                title="Total to be repaid"
                text={`$${totalToBeRepaid}`}
              />
            </div>

            <div
              className={`${styles['final_container']}${
                resultsIsVisible ? ' animate' : ''
              }`}
            >
              <span className={styles['final_image']}>
                <FaMoneyBills />
              </span>
              <div className={styles['final_body']}>
                <h3 className={styles['final_top']}>Your monthly payment:</h3>
                <strong className={styles['final_text']}>
                  ${monthlyPayment}
                </strong>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

function CardItem({ animate, image, title, text }) {
  return (
    <div className={`${styles['card_item']}${animate ? ' animate' : ''}`}>
      <span className={styles['card_image']}>{image}</span>
      <div className={styles['card_body']}>
        <h3 className={styles['card_title']}>{title}</h3>
        <strong className={styles['card_text']}>{text}</strong>
      </div>
    </div>
  );
}

export default ResultsSummary;
