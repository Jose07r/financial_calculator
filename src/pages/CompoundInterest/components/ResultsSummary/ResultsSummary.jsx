import { useInterestContext } from '@/contexts/InterestContext/InterestContext';
import { useRef, useState, useEffect } from 'react';

import walletIcon from '@images/results-wallet.svg';
import contributionsIcon from '@images/results-contributions.svg';
import interestIcon from '@images/results-interest-projection.svg';
import balanceIcon from '@images/results-balance.svg';

import styles from '@pages/CompoundInterest/components/ResultsSummary/ResultsSummary.module.css';

function ResultsSummary({ isLoading }) {
  const { results } = useInterestContext();
  const [resultsIsVisible, setResultsIsVisible] = useState(false);

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
  const startingAmount = results ? results.final.startingAmount : null;
  const accruedContributions = results
    ? results.final.accrued_contributions
    : null;
  const accruedInterest = results ? results.final.accrued_interest : null;
  const totalBalance = results ? results.final.balance : null;

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
                image={
                  <img
                    className={styles['card_image']}
                    src={walletIcon}
                    alt="Wallet icon"
                  />
                }
                title="Starting amount"
                text={`$${startingAmount}`}
              />
              <CardItem
                animate={resultsIsVisible}
                image={
                  <img
                    className={styles['card_image']}
                    src={contributionsIcon}
                    alt="Coins icon"
                  />
                }
                title="Extra contributions"
                text={`$${accruedContributions}`}
              />
              <CardItem
                animate={resultsIsVisible}
                image={
                  <img
                    className={styles['card_image']}
                    src={interestIcon}
                    alt="Interest projection icon"
                  />
                }
                title="Accrued interest"
                text={`$${accruedInterest}`}
              />
            </div>

            {/* Balance Summary */}
            <div
              className={`${styles['balance_container']}${
                resultsIsVisible ? ' animate' : ''
              }`}
            >
              <span>
                <img
                  className={styles['balance_image']}
                  src={balanceIcon}
                  alt="Balance icon"
                />
              </span>
              <div className={styles['balance_body']}>
                <h3 className={styles['balance_title']}>TOTAL BALANCE</h3>
                <strong className={styles['balance_text']}>
                  ${totalBalance}
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
