import { NavLink } from 'react-router-dom';
import Dropdown from '@components/ui/dropdown_menu/Dropdown/Dropdown';

import styles from '@components/layout/NavBar/NavBar.module.css';
import { FaCalculator } from 'react-icons/fa';
import logo from '@images/logo.svg';

function NavBar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <span>
          <img className={styles['logo']} src={logo} alt="JRangel.dev(logo)" />
        </span>
        <Dropdown
          buttonText={
            <span>
              <FaCalculator />
              Calculators
            </span>
          }
          content={
            <div className={styles['nav_list']}>
              <NavLink
                className={styles['nav_link']}
                to="/compound-interest-calculator"
              >
                Compound Interest Calculator
              </NavLink>
              <NavLink
                className={styles['nav_link']}
                to="/savings-goal-calculator"
              >
                Savings Goal Calculator
              </NavLink>
              <NavLink className={styles['nav_link']} to="/">
                Mortgage Calculator
              </NavLink>
            </div>
          }
        />
      </nav>
    </header>
  );
}

export default NavBar;
