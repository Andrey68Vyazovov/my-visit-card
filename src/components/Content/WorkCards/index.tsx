import styles from './index.module.scss';
import { WorkCardData } from '../types';

interface WorkCardsProps {
  cards: WorkCardData[];
}

const WorkCards = ({ cards }: WorkCardsProps) => {
  return (
    <div className={styles.cardsContainer}>
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={card.images[0]}
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
            <button className={styles.viewButton}>view project</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkCards;