import { useSavingsContext } from '@/contexts/SavingsContext/SavingsContext';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

import { IoMdWallet } from 'react-icons/io';
import { GoGoal } from 'react-icons/go';
import { FaClock } from 'react-icons/fa';
import { FaMoneyBills } from 'react-icons/fa6';
import { MdAccountBalance } from 'react-icons/md';
import { FaRegCalendarDays } from 'react-icons/fa6';
import { formatNumberWithCommas } from '@/utils/formatNumber';

import addMonthsToDate from '@/utils/addMonthsToDate';

import styles from '@pages/SavingsGoal/components/ResultsSummary/ResultsSummary.module.css';

function ResultsSummary({ isLoading }) {
  const { results } = useSavingsContext();
  const [resultsIsVisible, setResultsIsVisible] = useState(false);

  const calculationType = results ? results.calculationType : null;

  const resultsRef = useRef(null);

  // Animate Results
  useEffect(() => {
    const resultsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setResultsIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) resultsObserver.unobserve(entry.target);
      },
      { threshold: 0.3 }
    );

    if (resultsRef.current) resultsObserver.observe(resultsRef.current);

    return () => {
      setResultsIsVisible(false);
    };
  }, [results, isLoading]);

  // Card Item Info
  const initialBalance = results ? results.final?.initialBalance : null;
  const savingsGoal = results ? results.final?.savingsGoal : null;
  const monthlyContribution = results
    ? results.final?.monthlyContribution
    : null;
  const yearsToGoal = results ? results.final?.yearsToGoal : null;
  const monthsRemaining = results ? results.final?.monthsRemaining : null;
  const totalSavings = results ? results.final?.totalSavings : null;
  const dateToGoal = results
    ? addMonthsToDate(results.data.monthly.length)
    : null;

  // Conditional text for the saving goal time
  let timeToGoalText = '';
  if (yearsToGoal !== 0) {
    timeToGoalText += `${yearsToGoal} ${yearsToGoal === 1 ? 'year' : 'years'}`;
  }

  if (monthsRemaining !== 0) {
    if (yearsToGoal !== 0) {
      timeToGoalText += `, `;
    }
    timeToGoalText += `${monthsRemaining} ${
      monthsRemaining === 1 ? 'month' : 'months'
    }`;
  }

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
              {calculationType === 'contribution' && (
                <CardItem
                  animate={resultsIsVisible}
                  image={<IoMdWallet />}
                  title="Initial Balance"
                  text={`$${initialBalance}`}
                />
              )}

              <CardItem
                animate={resultsIsVisible}
                image={<GoGoal />}
                title="Savings Goal"
                text={`$${savingsGoal}`}
              />
              {calculationType !== 'contribution' && (
                <>
                  <CardItem
                    animate={resultsIsVisible}
                    image={<FaClock />}
                    title="Time to save"
                    text={timeToGoalText}
                  />
                  <CardItem
                    animate={resultsIsVisible}
                    image={<FaMoneyBills />}
                    title="Monthly contribution"
                    text={`$${monthlyContribution}`}
                  />
                  <CardItem
                    animate={resultsIsVisible}
                    image={<MdAccountBalance />}
                    title="You will have saved"
                    text={`$${totalSavings}`}
                  />
                </>
              )}
              {calculationType === 'contribution' && (
                <CardItem
                  animate={resultsIsVisible}
                  image={<FaClock />}
                  title="Time to reach goal"
                  text={timeToGoalText}
                />
              )}
            </div>

            <div
              className={`${styles['final_container']}${
                resultsIsVisible ? ' animate' : ''
              }`}
            >
              <span className={styles['final_image']}>
                {calculationType === 'contribution' ? (
                  <FaMoneyBills />
                ) : (
                  <FaRegCalendarDays />
                )}
              </span>
              <div className={styles['final_body']}>
                <h3 className={styles['final_top']}>
                  {calculationType === 'contribution'
                    ? 'You have to save'
                    : 'You will reach your goal on'}
                </h3>
                <strong className={styles['final_text']}>
                  {calculationType === 'contribution'
                    ? `$${monthlyContribution}`
                    : dateToGoal}
                </strong>
                {calculationType === 'contribution' && (
                  <p className={styles['final_bottom']}>every month</p>
                )}
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
