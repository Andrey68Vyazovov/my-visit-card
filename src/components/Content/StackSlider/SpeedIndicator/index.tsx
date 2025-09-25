import styles from './index.module.scss';

interface SpeedIndicatorProps {
  scrollSpeed: number; // Скорость прокрутки (1000, 2000, 4000)
  isPaused: boolean; // Состояние паузы
  onSpeedChange?: () => void; // Callback для смены скорости
}

const SpeedIndicator = ({ scrollSpeed, isPaused, onSpeedChange }: SpeedIndicatorProps) => {
  const getTriangleCount = () => {
    switch (scrollSpeed) {
      case 1000:
        return 3;
      case 2000:
        return 2;
      case 4000:
      default:
        return 1;
    }
  };

  return (
    <div className={styles.indicatorContainer} onClick={onSpeedChange}>
      {isPaused ? (
        <div className={styles.pauseIcon}>
          <span className={styles.pauseBar} />
          <span className={styles.pauseBar} />
        </div>
      ) : (
        <div className={styles.triangleContainer}>
          {Array.from({ length: getTriangleCount() }).map((_, index) => (
            <div key={`triangle-${index}`} className={styles.triangle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SpeedIndicator;