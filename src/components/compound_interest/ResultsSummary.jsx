import walletIcon from '@images/icons/results-wallet.svg';
import contributionsIcon from '@images/icons/results-contributions.svg';
import interestIcon from '@images/icons/results-interest-projection.svg';
import balanceIcon from '@images/icons/results-balance.svg';
import { useInterestContext } from '@/contexts/InterestContext';
import { formatNumberWithCommas } from '@/utils/formatNumber';

import styles from '@components/compound_interest/ResultsSummary.module.css';

function ResultsSummary() {
  const { startingAmount, results } = useInterestContext();

  const accruedInterest = results
    ? results.yearly[results.yearly.length - 1].accrued_interest
    : null;
  const accruedContributions = results
    ? results.yearly[results.yearly.length - 1].accrued_contributions
    : null;

  //   Get total balance
  const totalBalance = results
    ? results.yearly[results.yearly.length - 1].balance
    : null;

  return (
    <>
      {results && (
        <div className={styles['results_container']}>
          {/* Main Investment Performance */}
          <h2 className={styles['results_title']}>Results</h2>
          {/* Cards */}
          <div className={styles['cards_container']}>
            <div className={styles['card_item']}>
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

            <div className={styles['card_item']}>
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

            <div className={styles['card_item']}>
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

          <div className={styles['balance_container']}>
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

export default ResultsSummary;
