import { useMemo } from 'react';
import Star from './Star';
import styles from './index.module.scss';
import { BackgroundAnimationProps } from './types';
import { ANIMATION_CONFIG } from './index.const';

const BackgroundAnimation  = ({ 
  starsCount = ANIMATION_CONFIG.STARS_COUNT
}:BackgroundAnimationProps) => {

  const stars = useMemo(() => 
    Array.from({ length: starsCount }, (_, index) => (
      <Star key={index}/>
    )), 
    [starsCount]
  );

  return (
    <div className={styles.backgroundContainer}>
      {stars}
    </div>
  );
};

export default BackgroundAnimation;