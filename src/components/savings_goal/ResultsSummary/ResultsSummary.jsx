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

import styles from '@components/savings_goal/ResultsSummary/ResultsSummary.module.css';

function ResultsSummary({ isLoading, getContext }) {
  const { savingsGoal, yearsToReachGoal, results } = getContext();
  const [resultsIsVisible, setResultsIsVisible] = useState(false);
  const [isYearsToGoal, setIsYearsToGoal] = useState(false);

  const resultsRef = useRef(null);

  // To load different facts
  useEffect(() => {
    if (results && results.yearsToGoal) {
      setIsYearsToGoal(true);
    } else {
      setIsYearsToGoal(false);
    }
  }, [results]);

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
  const initialBalance = results
    ? formatNumberWithCommas(results.data.monthly[0].principal)
    : null;
  const contribution = results
    ? formatNumberWithCommas(results.data.monthly[0].contributions)
    : null;
  const yearsToGoal = results
    ? results.yearsToGoal
      ? results.yearsToGoal
      : null
    : null;
  const monthsRemaining = results
    ? results.monthsRemaining
      ? results.monthsRemaining
      : null
    : null;
  const totalSavings = results
    ? formatNumberWithCommas(
        results.data.monthly[results.data.monthly.length - 1].balance
      )
    : null;
  const dateToGoal = results
    ? addMonthsToDate(results.data.monthly.length)
    : null;

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
              {!isYearsToGoal && (
                <CardItem
                  animate={resultsIsVisible}
                  image={<IoMdWallet />}
                  title="Initial Balance"
                  text={initialBalance}
                />
              )}

              <CardItem
                animate={resultsIsVisible}
                image={<GoGoal />}
                title="Savings Goal"
                text={savingsGoal.formattedValue}
              />
              {isYearsToGoal && (
                <>
                  <CardItem
                    animate={resultsIsVisible}
                    image={<FaClock />}
                    title="Time to save"
                    text={`${yearsToGoal} years, ${monthsRemaining} months`}
                  />
                  <CardItem
                    animate={resultsIsVisible}
                    image={<FaMoneyBills />}
                    title="Monthly contribution"
                    text={contribution}
                  />
                  <CardItem
                    animate={resultsIsVisible}
                    image={<MdAccountBalance />}
                    title="You will have saved"
                    text={`$${totalSavings}`}
                  />
                </>
              )}
              {!isYearsToGoal && (
                <CardItem
                  animate={resultsIsVisible}
                  image={<FaClock />}
                  title="Years to reach goal"
                  text={yearsToReachGoal}
                />
              )}
            </div>

            <div
              className={`${styles['final_container']}${
                resultsIsVisible ? ' animate' : ''
              }`}
            >
              <span className={styles['final_image']}>
                {isYearsToGoal ? <FaRegCalendarDays /> : <FaMoneyBills />}
              </span>
              <div className={styles['final_body']}>
                <h3 className={styles['final_top']}>
                  {isYearsToGoal
                    ? 'You will reach your goal on'
                    : 'You have to save'}
                </h3>
                <strong className={styles['final_text']}>
                  {isYearsToGoal ? dateToGoal : `$${contribution}`}
                </strong>
                {!isYearsToGoal && (
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
