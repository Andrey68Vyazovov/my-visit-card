import styles from './index.module.scss';
import { myWorkData, workCardsData } from '../index.const';
import WorkCards from '../WorkCards';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { useState } from 'react';
import WorkModal from '../../Modal';

const MyWork = () => {
  const { title, frames } = myWorkData;
  const [selectedWorkIndex, setSelectedWorkIndex] = useState<number | null>(null);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const isModalOpen = selectedWorkIndex !== null;
  useScrollLock(isModalOpen); 

  const handleViewProject = (index: number) => {
    setSelectedWorkIndex(index);
    setIsModalClosing(false);
  };

  const handleCloseModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setSelectedWorkIndex(null);
      setIsModalClosing(false);
    }, 300);
  };


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
      
      <div className={styles.workCardsPlaceholder}>
        <WorkCards cards={workCardsData}  onViewProject={handleViewProject} />
      </div>

      <WorkModal
        work={selectedWorkIndex !== null ? workCardsData[selectedWorkIndex] ?? null : null}
        isOpen={isModalOpen && !isModalClosing}
        onClose={handleCloseModal}
      />
     
    </section>
  );
};

export default MyWork;