import { useState, useEffect, useCallback } from "react";
import { WorkImage } from "../../Content/types";
import styles from "./index.module.scss";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SliderProps {
  images: WorkImage[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onClose: () => void;
}

const Slider = ({
  images,
  currentSlide,
  onSlideChange,
  onClose,
}: SliderProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imagePromises = images.map((image) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();
            img.src = image.src;
            img.onload = () => resolve();
            img.onerror = () =>
              reject(new Error(`Failed to load image: ${image.src}`));
          });
        });
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoading(false);
      }
    };

    if (images.length) {
      preloadImages();
    } else {
      setIsLoading(false);
    }
  }, [images]);

  const nextSlide = useCallback(() => {
    if (isAnimating || isLoading) return;
    setIsAnimating(true);
    onSlideChange((currentSlide + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, isLoading, currentSlide, images.length, onSlideChange]);

  const prevSlide = useCallback(() => {
    if (isAnimating || isLoading) return;
    setIsAnimating(true);
    onSlideChange((currentSlide - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, isLoading, currentSlide, images.length, onSlideChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && !isAnimating) {
        nextSlide();
      } else if (e.key === "ArrowLeft" && !isAnimating) {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, currentSlide, onClose, nextSlide, prevSlide]);

  if (!images.length || currentSlide < 0 || currentSlide >= images.length) {
    return null;
  }

  if (isLoading) {
    return (
      <div
        className={styles.slider}
        role="region"
        aria-label="Image slider loading"
      >
        <div className={styles.slideContainer}>
          <div className={styles.spinner} aria-label="Loading images">
            <div className={styles.spinnerInner} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.slider} role="region" aria-label="Image slider">
      <div className={styles.slideContainer}>
        <img
          src={images[currentSlide]?.src || ""}
          alt={images[currentSlide]?.description || "Slide image"}
          className={`${styles.slideImage} ${
            isAnimating ? styles.animating : ""
          }`}
          loading="lazy"
        />
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          disabled={isAnimating || isLoading}
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          disabled={isAnimating || isLoading}
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
        <div className={styles.slideIndicator} aria-live="polite">
          {currentSlide + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Slider;
