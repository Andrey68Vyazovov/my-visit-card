import styles from './index.module.scss';
import { myWorkData, workCardsData } from '../index.const';
import WorkCards from '../WorkCards';

const MyWork = () => {
  const { title, frames } = myWorkData;

  return (
    <section className={styles.myWorkSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.description}>
            {frames.map((frame, index) => (
              <p key={index} className={styles.frame}>
                {frame}
              </p>
            ))}
          </div>
        </header>
      
      </div>
      
      {/* Резерв места для карточек работ */}
      <div className={styles.workCardsPlaceholder}>
        <WorkCards cards={workCardsData} />
      </div>
     
    </section>
  );
};

export default MyWork;