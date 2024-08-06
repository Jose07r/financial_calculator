import walletIcon from '@images/icons/results-wallet.svg';
import contributionsIcon from '@images/icons/results-contributions.svg';
import interestIcon from '@images/icons/results-interest-projection.svg';
import balanceIcon from '@images/icons/results-balance.svg';
import { useInterestContext } from '@/contexts/InterestContext';
import { formatNumberWithCommas } from '@/utils/formatNumber';

import styles from '@components/compound_interest/ResultsSummary/ResultsSummary.module.css';
import { useRef, useState } from 'react';
import { useEffect } from 'react';

function ResultsSummary({ isLoading }) {
  const { startingAmount, results } = useInterestContext();
  const [resultsIsVisible, setResultsIsVisible] = useState(false);

  const resultsRef = useRef(null);

  // Animate Results
  useEffect(() => {
    const resultsObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log(entry);
        setResultsIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) resultsObserver.unobserve(entry.target);
      },
      { threshold: 0.5 }
    );

    if (resultsRef.current) resultsObserver.observe(resultsRef.current);

    return () => {
      setResultsIsVisible(false);
    };
  }, [results, isLoading]);

  // Card Item Info
  const accruedInterest = results
    ? results.yearly[results.yearly.length - 1].accrued_interest
    : null;
  const accruedContributions = results
    ? results.yearly[results.yearly.length - 1].accrued_contributions
    : null;
  const totalBalance = results
    ? results.yearly[results.yearly.length - 1].balance
    : null;

  if (isLoading) {
    return;
  } else {
    return (
      <>
        {results && (
          <div className={styles['results_container']}>
            {/* Main Investment Performance */}
            <h2 className={styles['results_title']}>Results</h2>
            {/* Cards */}
            <div className={styles['cards_container']} ref={resultsRef}>
              <div
                className={`${styles['card_item']}${
                  resultsIsVisible ? ' animate' : ''
                }`}
              >
                <span>
                  <img
                    className={styles['card_image']}
                    src={walletIcon}
                    alt="Wallet icon"
                  />
                </span>
                <div className={styles['card_body']}>
                  <h3 className={styles['card_title']}>Initial Investment</h3>
                  <strong className={styles['card_text']}>
                    ${startingAmount.formattedValue}
                  </strong>
                </div>
              </div>

              <div
                className={`${styles['card_item']}${
                  resultsIsVisible ? ' animate' : ''
                }`}
              >
                <span>
                  <img
                    className={styles['card_image']}
                    src={contributionsIcon}
                    alt="Coins icon"
                  />
                </span>
                <div className={styles['card_body']}>
                  <h3 className={styles['card_title']}>Extra Contributions</h3>
                  <strong className={styles['card_text']}>
                    ${formatNumberWithCommas(accruedContributions)}
                  </strong>
                </div>
              </div>

              <div
                className={`${styles['card_item']}${
                  resultsIsVisible ? ' animate' : ''
                }`}
              >
                <span>
                  <img
                    className={styles['card_image']}
                    src={interestIcon}
                    alt="Interest projection icon"
                  />
                </span>
                <div className={styles['card_body']}>
                  <h3 className={styles['card_title']}>Accrued Interest</h3>
                  <strong className={styles['card_text']}>
                    ${formatNumberWithCommas(accruedInterest)}
                  </strong>
                </div>
              </div>
            </div>

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
                  ${formatNumberWithCommas(totalBalance)}
                </strong>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default ResultsSummary;
