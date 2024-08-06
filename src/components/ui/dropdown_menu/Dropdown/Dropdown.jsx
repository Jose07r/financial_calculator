import { useEffect, useRef, useState } from 'react';
import DropdownButton from '@components/ui/dropdown_menu/DropdownButton/DropdownButton';
import DropdownContent from '@components/ui/dropdown_menu/DropdownContent/DropdownContent';

import styles from '@components/ui/dropdown_menu/Dropdown/Dropdown.module.css';

function Dropdown({ buttonText, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  //   To close dropdown when clicking outside of it
  useEffect(() => {
    function handler(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [dropdownRef]);

  function handleToggle() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className={styles['dropdown_container']} ref={dropdownRef}>
      <DropdownButton isOpen={isOpen} toggle={handleToggle}>
        {buttonText}
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>{content}</DropdownContent>
    </div>
  );
}

export default Dropdown;
