import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from '@pages/ErrorPage';
import CompoundInterest from '@pages/CompoundInterest/CompoundInterest';
import SavingsGoal from '@pages/SavingsGoal/SavingsGoal';
import { Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/compound-interest-calculator" replace={true} />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'compound-interest-calculator',
    element: <CompoundInterest />,
  },
  {
    path: 'savings-goal-calculator',
    element: <SavingsGoal />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
