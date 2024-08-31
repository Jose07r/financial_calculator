import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import CompoundInterest from '@pages/CompoundInterest/CompoundInterest';
import SavingsGoal from '@pages/SavingsGoal/SavingsGoal';
import LoanCalculator from '@pages/LoanCalculator/LoanCalculator';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
  },
  {
    path: '/financial_calculator',
    element: <Navigate to="compound-interest-calculator" replace={true} />,
  },
  {
    path: '/financial_calculator/compound-interest-calculator',
    element: <CompoundInterest />,
  },
  {
    path: '/financial_calculator/savings-goal-calculator',
    element: <SavingsGoal />,
  },
  {
    path: '/financial_calculator/loan-calculator',
    element: <LoanCalculator />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
