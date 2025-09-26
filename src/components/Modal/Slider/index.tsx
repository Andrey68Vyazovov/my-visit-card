// src/components/Modal/Slider/index.tsx
import { useState } from 'react';
import { WorkImage } from '../../Content/types';
import styles from './index.module.scss';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SliderProps {
  images: WorkImage[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const Slider = ({ images, currentSlide, onSlideChange }: SliderProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onSlideChange((currentSlide + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onSlideChange((currentSlide - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!images.length) return null;

  return (
    <div className={styles.slider}>
      {/* Основное изображение */}
      <div className={styles.slideContainer}>
        <img
          src={images[currentSlide]?.src || ''}
          alt={images[currentSlide]?.description || 'Image'}
          className={`${styles.slideImage} ${isAnimating ? styles.animating : ''}`}
        />
        
        {/* Навигационные стрелки */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          disabled={isAnimating}
        >
            <FaChevronLeft /> 
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          disabled={isAnimating}
        >
             <FaChevronRight />
        </button>

        {/* Индикатор текущего слайда */}
        <div className={styles.slideIndicator}>
          {currentSlide + 1} / {images.length}
        </div>
      </div>

    </div>
  );
};

export default Slider;