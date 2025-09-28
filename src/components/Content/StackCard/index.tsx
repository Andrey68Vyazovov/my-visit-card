import styles from './index.module.scss';

import { TechStackItem } from '../types';


const TechStackCard = ({
  logo,
  title,
  description,
  gist
}: TechStackItem) => {
  const handleViewGist = () => {
    if(gist){
      window.open(gist, '_blank', 'noopener,noreferrer')
    }
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img src={logo} alt={title} className={styles.logo} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.content}>
        <div className={styles.tagWrapper}>
          <span className={styles.openTag}>&lt;h3&gt;</span>
          <div className={styles.verticalLine}></div>
          <span className={styles.closeTag}>&lt;/h3&gt;</span>
        </div>
        
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button 
          className={styles.gistButton} 
          onClick={handleViewGist}
          disabled={!gist}
        >
          view gist...
        </button>
      </div>
    </div>
  );
};

export default TechStackCard;