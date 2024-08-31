import { FaLinkedin } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

import styles from '@components/layout/Footer/Footer.module.css';

function Footer() {
  return (
    <footer className={styles['footer']}>
      <div className={styles['top_container']}>
        <div className={styles['social_media']}>
          <a
            className={styles['social_link']}
            href="https://www.linkedin.com/in/jose-miguel-rangel-8973a9277/"
            target="_blank"
          >
            <FaLinkedin />
          </a>
          <a
            className={styles['social_link']}
            href="https://www.instagram.com/miguee_rx_/"
            target="_blank"
          >
            <FaInstagram />
          </a>
          <a
            className={styles['social_link']}
            href="https://github.com/Jose07r"
            target="_blank"
          >
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
