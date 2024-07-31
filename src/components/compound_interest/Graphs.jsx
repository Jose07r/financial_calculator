import { useState } from 'react';
import BarChart from '@components/compound_interest/BarChart';
import BasicTable from '@components/compound_interest/BasicTable';
import Select from 'react-select';
import { useInterestContext } from '@/contexts/InterestContext';
import getTableColumns from '@data/compound_interest/getTableColumns';

import styles from '@components/compound_interest/Graphs.module.css';
import selectStyles from '@/assets/selectInputStyles.js';

function Graphs() {
  const [graphType, setGraphType] = useState('barChart');
  const [breakdownChoice, setBreakdownChoice] = useState('yearly');
  const { results, yearsOfInvesting } = useInterestContext();

  // Select options
  const selectOptions = [
    { value: 'yearly', label: 'yearly' },
    { value: 'monthly', label: 'monthly' },
  ];

  return (
    <div className={styles['graphs_container']}>
      <div className={styles['controls_container']}>
        {/* Switch monthly and yearly info  */}
        <Select
          value={breakdownChoice}
          onChange={(selectedValue) => setBreakdownChoice(selectedValue.value)}
          placeholder={breakdownChoice}
          isSearchable={false}
          className="react_select_container"
          classNamePrefix="react_select"
          options={selectOptions}
          styles={selectStyles}
        />
        {/* Switch graph display */}
        <div className={styles['graph_type_container']}>
          <button
            className={graphType === 'barChart' ? 'active' : ''}
            onClick={() => setGraphType('barChart')}
          >
            <svg
              className={styles['svg_icon']}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5 6.25H0V20H5V6.25Z" />
              <path d="M20 11.25H15V20H20V11.25Z" />
              <path d="M12.5 0H7.5V20H12.5V0Z" />
            </svg>
          </button>
          <button
            className={graphType === 'table' ? 'active' : ''}
            onClick={() => setGraphType('table')}
          >
            <svg
              className={styles['svg_icon']}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 20V0H20V20H0ZM2.22222 6.66667H17.7778V2.22222H2.22222V6.66667ZM8.13889 12.2222H11.8611V8.88889H8.13889V12.2222ZM8.13889 17.7778H11.8611V14.4444H8.13889V17.7778ZM2.22222 12.2222H5.91667V8.88889H2.22222V12.2222ZM14.0833 12.2222H17.7778V8.88889H14.0833V12.2222ZM2.22222 17.7778H5.91667V14.4444H2.22222V17.7778ZM14.0833 17.7778H17.7778V14.4444H14.0833V17.7778Z" />
            </svg>
          </button>
        </div>
      </div>
      <h3 className={styles['graph_title']}>
        Projection for {yearsOfInvesting} years
      </h3>
      {graphType === 'barChart' ? (
        <BarChart breakdownChoice={breakdownChoice} />
      ) : (
        <BasicTable
          data={results[breakdownChoice]}
          columns={getTableColumns(breakdownChoice)}
        />
      )}
    </div>
  );
}

export default Graphs;
