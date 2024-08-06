import styles from '@components/ui/dropdown_menu/DropdownContent/DropdownContent.module.css';

function DropdownContent({ isOpen, children }) {
  return (
    <>
      {isOpen && <div className={styles['dropdown_content']}>{children}</div>}
    </>
  );
}

export default DropdownContent;
