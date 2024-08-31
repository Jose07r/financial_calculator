import { useLoanContext } from '@/contexts/LoanContext/LoanContext';
import { useRef, useState } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { formatNumberWithCommas } from '@/utils/formatNumber';

import columns from '@pages/LoanCalculator/components/AmortizationTable/amortizationColumns';

import styles from '@pages/LoanCalculator/components/AmortizationTable/AmortizationTable.module.css';

function BasicTable() {
  const { results } = useLoanContext();
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  let data = results?.data || null;

  const yearKeys = useRef(Object.keys(data));
  const currentYear = yearKeys.current[currentYearIndex];
  const yearData = data[currentYear]?.rows || [];

  const totalYearData = data[currentYear]?.totals || [];

  const isLastPage = currentYearIndex === yearKeys.current.length - 1;

  const table = useReactTable({
    columns,
    data: yearData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: currentYearIndex,
        pageSize: 12,
      },
    },
    manualPagination: true,
    onPaginationChange: ({ pageIndex }) => {
      setCurrentYearIndex(pageIndex);
    },
  });

  return (
    <div className={styles[['container']]}>
      <div className={styles['table_container']}>
        <table className={styles['table']}>
          <thead className={styles['table_head']}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>{header.column.columnDef.header}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={styles['table_body']}>
            {table.getRowModel().rows.map((row) => [
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>,
            ])}
          </tbody>
          <tfoot className={styles['table_footer']}>
            <tr>
              <td className={isLastPage ? styles['final'] : ''}>
                {!isLastPage ? `${currentYear} total` : 'Final total'}
              </td>
              <td className={isLastPage ? styles['final'] : ''}>
                {!isLastPage
                  ? `$${formatNumberWithCommas(totalYearData.payment)}`
                  : `$${results.final.toBeRepaid}`}
              </td>
              <td className={isLastPage ? styles['final'] : ''}>
                {!isLastPage
                  ? `$${formatNumberWithCommas(totalYearData.principal)}`
                  : `$${results.final.loanAmount}`}
              </td>
              <td className={isLastPage ? styles['final'] : ''}>
                {!isLastPage
                  ? `$${formatNumberWithCommas(totalYearData.interest)}`
                  : `$${results.final.totalInterest}`}
              </td>
              <td className={isLastPage ? styles['final'] : ''}>
                ${formatNumberWithCommas(totalYearData.remainingBalance)}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className={styles['table_pagination']}>
          <button
            onClick={() => setCurrentYearIndex(0)}
            disabled={currentYearIndex === 0}
          >
            &lt;&lt;
          </button>
          <button
            className={styles['btn_inner']}
            onClick={() => setCurrentYearIndex((prev) => prev - 1)}
            disabled={currentYearIndex === 0}
          >
            &lt;
          </button>
          <button
            className={styles['btn_inner']}
            onClick={() => setCurrentYearIndex((prev) => prev + 1)}
            disabled={isLastPage}
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentYearIndex(yearKeys.current.length - 1)}
            disabled={isLastPage}
          >
            &gt;&gt;
          </button>
          <span className={styles['pagination_text']}>
            Page {currentYearIndex + 1} of {yearKeys.current.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BasicTable;
