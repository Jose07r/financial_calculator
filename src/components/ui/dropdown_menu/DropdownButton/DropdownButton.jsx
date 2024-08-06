import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import styles from '@components/ui/dropdown_menu/DropdownButton/DropdownButton.module.css';

function DropdownButton({ isOpen, toggle, children }) {
  return (
    <div className={styles['dropdown_btn']} onClick={() => toggle()}>
      <p className={styles['dropdown_btn_text']}>{children}</p>
      <span className={styles['toggle_icon']}>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </span>
    </div>
  );
}

export default DropdownButton;
