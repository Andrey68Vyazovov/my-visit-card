// src/components/BackgroundAnimation/Star/index.tsx
import { useMemo } from 'react';
import styles from './index.module.scss';
import { STAR_COLORS, ANIMATION_CONFIG } from '../index.const';

const Star = () => {
  const starConfig = useMemo(() => {
    const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
    const orbitRadiusX = Math.random() * 
      (ANIMATION_CONFIG.MAX_ORBIT_RADIUS - ANIMATION_CONFIG.MIN_ORBIT_RADIUS) + 
      ANIMATION_CONFIG.MIN_ORBIT_RADIUS;
    const orbitRadiusY = orbitRadiusX * ANIMATION_CONFIG.ORBIT_ELLIPSE_SCALE;
    const orbitSpeed = Math.random() * 
      (ANIMATION_CONFIG.MAX_ORBIT_SPEED - ANIMATION_CONFIG.MIN_ORBIT_SPEED) + 
      ANIMATION_CONFIG.MIN_ORBIT_SPEED;
    const startAngle = Math.random() * 360;
    const trailLength = Math.random() * 
      (ANIMATION_CONFIG.MAX_TRAIL_LENGTH - ANIMATION_CONFIG.MIN_TRAIL_LENGTH) + 
      ANIMATION_CONFIG.MIN_TRAIL_LENGTH;

    const willTwinkle = Math.random() < ANIMATION_CONFIG.TWINKLE_PROBABILITY;
    const twinkleDelay = willTwinkle 
      ? Math.random() * (ANIMATION_CONFIG.TWINKLE_DELAY_MAX - ANIMATION_CONFIG.TWINKLE_DELAY_MIN) + ANIMATION_CONFIG.TWINKLE_DELAY_MIN
      : 0;

    return {
      color,
      orbitRadiusX: `${orbitRadiusX}vh`,
      orbitRadiusY: `${orbitRadiusY}vh`,
      orbitSpeed: `${orbitSpeed}s`,
      startAngle: `${startAngle}deg`,
      trailLength: `${trailLength}%`,
      beamAngle: `${ANIMATION_CONFIG.BEAM_ANGLE}deg`,
      beamLength: `${ANIMATION_CONFIG.BEAM_LENGTH}px`,
      beamVerticalOffset: `${ANIMATION_CONFIG.BEAM_VERTICAL_OFFSET}%`,
      willTwinkle,
      twinkleDuration: `${ANIMATION_CONFIG.TWINKLE_DURATION}s`,
      twinkleDelay: `${twinkleDelay}s`
    };
  }, []);

  return (
    <div 
      className={`${styles.star} ${starConfig.willTwinkle ? styles.twinkling : ''}`}
      style={{
        '--star-size': `${ANIMATION_CONFIG.STAR_SIZE}px`,
        '--star-color': starConfig.color,
        '--orbit-radius-x': starConfig.orbitRadiusX,
        '--orbit-radius-y': starConfig.orbitRadiusY,
        '--orbit-speed': starConfig.orbitSpeed,
        '--start-angle': starConfig.startAngle,
        '--trail-length': starConfig.trailLength,
        '--beam-angle': starConfig.beamAngle,
        '--beam-length': starConfig.beamLength,
        '--beam-vertical-offset': starConfig.beamVerticalOffset,
        '--twinkle-duration': starConfig.twinkleDuration,
        '--twinkle-delay': starConfig.twinkleDelay,
      } as React.CSSProperties}
    >
      <div className={styles.starPixel} />
      <div className={styles.starTrail} />
      <div className={styles.starBeam} />
    </div>
  );
};

export default Star;