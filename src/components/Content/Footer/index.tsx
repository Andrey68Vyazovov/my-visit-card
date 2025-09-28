import { FaChevronUp } from 'react-icons/fa';
import styles from './index.module.scss';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button
          className={styles.scrollButton}
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <FaChevronUp className={`${styles.chevron} ${styles.chevron1}`} />
          <FaChevronUp className={`${styles.chevron} ${styles.chevron2}`} />
          <FaChevronUp className={`${styles.chevron} ${styles.chevron3}`} />
        </button>
        <p className={styles.text}>
          Andrey Vyazovov <span className={styles.year}>©2025</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;