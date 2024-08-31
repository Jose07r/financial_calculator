import { formatNumberWithCommas } from '@/utils/formatNumber';

const columns = [
  {
    header: 'Month',
    accessorKey: 'month',
  },
  {
    header: 'Payment',
    accessorFn: (row) => {
      if (isNaN(row.payment)) {
        return row.payment;
      } else {
        return `$${formatNumberWithCommas(row.payment)}`;
      }
    },
  },
  {
    header: 'Principal',
    accessorFn: (row) => {
      if (isNaN(row.principal)) {
        return row.principal;
      } else {
        return `$${formatNumberWithCommas(row.principal)}`;
      }
    },
  },
  {
    header: 'Interest',
    accessorFn: (row) => {
      if (isNaN(row.interest)) {
        return row.interest;
      } else {
        return `$${formatNumberWithCommas(row.interest)}`;
      }
    },
  },
  {
    header: 'Balance',
    accessorFn: (row) => {
      if (isNaN(row.remainingBalance)) {
        return row.remainingBalance;
      } else {
        return `$${formatNumberWithCommas(row.remainingBalance)}`;
      }
    },
  },
];

export default columns;
