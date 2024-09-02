import ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './index.css';
import NotFound from '@pages/NotFound/NotFound';
import CompoundInterest from '@pages/CompoundInterest/CompoundInterest';
import SavingsGoal from '@pages/SavingsGoal/SavingsGoal';
import LoanCalculator from '@pages/LoanCalculator/LoanCalculator';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/compound-interest-calculator" replace={true} />}
      />
      <Route
        path="/compound-interest-calculator"
        element={<CompoundInterest />}
      />
      <Route path="/savings-goal-calculator" element={<SavingsGoal />} />
      <Route path="/loan-calculator" element={<LoanCalculator />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
