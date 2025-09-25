// src/components/Content/index.tsx
import styles from './index.module.scss';
import TestContent from './TestContent';

const Content = () => {
  return (
    <div className={styles.content}>
      <header className={styles.header}>
        {/* Хедер высотой 100px */}
        {/* <h1>Header</h1>*/}
        <h1></h1>
      </header>
      
      <main className={styles.main}>
        {/* Основной контент с тестовым блоком */}
        <TestContent />
      </main>
      
      <footer className={styles.footer}>
        {/* Футер высотой 230px */}
        <p>Footer</p>
      </footer>
    </div>
  );
};

export default Content;