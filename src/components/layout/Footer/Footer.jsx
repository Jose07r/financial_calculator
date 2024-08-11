import { FaLinkedin } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

import styles from '@components/layout/Footer/Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['top_container']}>
        <div className={styles['portfolio_link']}>
          <b>See more projects at:</b>
          <a href="/">https.//josemrangel.com</a>
        </div>
        <div className={styles['social_media']}>
          <a className={styles['social_link']} href="/">
            <FaLinkedin />
          </a>
          <a className={styles['social_link']} href="/">
            <FaInstagram />
          </a>
          <a className={styles['social_link']} href="/">
            <FaGithub />
          </a>
        </div>
      </div>
      <small className={styles['copyright']}>
        &copy;2024 All rights reserved. Designed and developed by Jose M.
        Rangel.
      </small>
    </footer>
  );
}

export default Footer;
