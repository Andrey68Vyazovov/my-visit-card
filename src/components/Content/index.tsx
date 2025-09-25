import Footer from '../Footer';
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
      <Footer />
    </div>
  );
};

export default Content;