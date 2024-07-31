import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';

import styles from '@components/compound_interest/BasicTable.module.css';

function BasicTable({ data, columns }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 12,
  });

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className={styles['table_container']}>
      <table className={styles['table']}>
        <thead className={styles['table_head']}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
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
        <div className={styles['table_pagination']}>
          <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.firstPage()}
          >
            &lt;&lt;
          </button>
          <button
            className={styles['btn_inner']}
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            &lt;
          </button>
          <button
            className={styles['btn_inner']}
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            &gt;
          </button>
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.lastPage()}
          >
            &gt;&gt;
          </button>
        </div>
      </table>
    </div>
  );
}

export default BasicTable;
