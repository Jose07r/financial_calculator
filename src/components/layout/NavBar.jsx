import { NavLink } from 'react-router-dom';
import styles from '@components/layout/NavBar.module.css';
import logo from '@images/logo.svg';

function NavBar() {
  return (
    <header>
      <nav className={styles.navbar}>
        <span>
          <img className={styles['logo']} src={logo} alt="JRangel.dev(logo)" />
        </span>
        <div className={styles['nav_list']}>
          <NavLink
            className={styles['nav_link']}
            to="/compound-interest-calculator"
          >
            Interest Compound Calculator
          </NavLink>
          <NavLink className={styles['nav_link']} to="/savings-goal-calculator">
            Savings Goal Calculator
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
