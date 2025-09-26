import styles from './index.module.scss';
import { WorkCardData } from '../types';

interface WorkCardsProps {
  cards: WorkCardData[];
  onViewProject?: (index: number) => void;
}

const WorkCards = ({ cards, onViewProject }: WorkCardsProps) => {
  const handleViewProject = (index: number) => () => {
    onViewProject?.(index);
  };
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card} onClick={handleViewProject(index)}>
          <div className={styles.imageWrapper}>
            <img
              src={card.images[0]?.src}
              alt={`${card.title} poster`}
              className={styles.image}
            />
          </div>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>{card.title}</h3>
            <div className={styles.stack}>
              {card.stack.map((tech, techIndex) => (
                <span key={techIndex} className={styles.tech}>
                  {tech}
                  {techIndex < card.stack.length - 1 && <span className={styles.separator}> • </span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkCards;