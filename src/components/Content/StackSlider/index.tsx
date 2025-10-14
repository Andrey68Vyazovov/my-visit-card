import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import GistViewer from "./GistViewer";
import SpeedIndicator from "./SpeedIndicator";
import styles from "./index.module.scss";

import TechStackCard from "../StackCard";
import { TechStackItem } from "../types";

import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

interface TechStackProps {
  data: TechStackItem[];
  scrollSpeed?: number;
}

const TechStackSlider = ({
  data,
  scrollSpeed: initialScrollSpeed = 4000,
}: TechStackProps) => {
  const { setRef, visibleStates } = useScrollAnimation(1);
  const [, forceUpdate] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(initialScrollSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastLoadedTime, setLastLoadedTime] = useState<number>(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const currentIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const isManualScrollRef = useRef(false);
  const initialRandomSetRef = useRef(false); // флаг для первоначального рандома

  const extendedSlides = useMemo(
    () => (data.length > 0 ? [...data, ...data.slice(0, 3)] : []),
    [data]
  );

  const slideWidth = 360;
  const totalSlides = extendedSlides.length;

  const setCurrentIndex = useCallback((newIndex: number) => {
    currentIndexRef.current = newIndex;
    forceUpdate((prev) => prev + 1);
  }, []);

  const canScrollPrev = currentIndexRef.current > 0;
  const canScrollNext = currentIndexRef.current < totalSlides - 6;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Функция для получения случайного индекса с гистом
  const getRandomGistIndex = useCallback(() => {
    const gistIndices = extendedSlides
      .map((slide, index) => (slide.content ? index : -1))
      .filter((index) => index !== -1);

    if (gistIndices.length === 0) return null;

    const randomIndex =
      gistIndices[Math.floor(Math.random() * gistIndices.length)];
    return randomIndex;
  }, [extendedSlides]);

  // Установка первоначального случайного гиста при монтировании
  useEffect(() => {
    if (
      !isMobile &&
      visibleStates[0] &&
      data.length > 0 &&
      !initialRandomSetRef.current
    ) {
      const randomIndex = getRandomGistIndex();
      setHoveredIndex(randomIndex || null);
      initialRandomSetRef.current = true; // устанавливаем флаг, что первоначальный рандом выполнен
    }
  }, [isMobile, visibleStates, data.length, getRandomGistIndex]);

  const handleSpeedChange = () => {
    if (isMobile) return;

    const speeds = [4000, 2000, 1000];
    const currentIndex = speeds.indexOf(scrollSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setScrollSpeed(speeds[nextIndex] ?? scrollSpeed);
  };

  const startInterval = useCallback(() => {
    if (isMobile) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(
      () => {
        const nextIndex = currentIndexRef.current + 1;

        if (nextIndex >= totalSlides - 3) {
          setTimeout(() => {
            setIsTransitioning(false);
            setCurrentIndex(0);
            setIsFirstSlide(true);
          }, 1000);
        } else {
          if (isFirstSlide) {
            setIsFirstSlide(false);
          }
          setIsTransitioning(true);
        }

        setCurrentIndex(nextIndex);
      },
      isFirstSlide || currentIndexRef.current >= totalSlides - 3
        ? scrollSpeed / 2
        : scrollSpeed
    );
  }, [isMobile, isFirstSlide, scrollSpeed, totalSlides, setCurrentIndex]);

  // Функция для остановки слайдера
  const stopSlider = useCallback(() => {
    if (isMobile) return;

    setIsPaused(true);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, [isMobile]);

  // Функция для запуска слайдера с задержкой
  const startSliderWithDelay = useCallback(() => {
    if (isMobile) return;

    setIsPaused(false);

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      startInterval();
    }, 3000);
  }, [isMobile, startInterval]);

  // Функции для ручной прокрутки
  const scrollToNext = useCallback(() => {
    if (isMobile || !canScrollNext) return;

    isManualScrollRef.current = true;
    stopSlider();

    setIsTransitioning(true);
    const nextIndex = currentIndexRef.current + 1;
    if (nextIndex >= totalSlides - 3) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setIsFirstSlide(true);
      }, 1000);
    }
    setCurrentIndex(nextIndex);

    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 500);
  }, [isMobile, totalSlides, stopSlider, setCurrentIndex, canScrollNext]);

  const scrollToPrev = useCallback(() => {
    if (isMobile || !canScrollPrev) return;

    isManualScrollRef.current = true;
    stopSlider();

    setIsTransitioning(true);
    const newIndex =
      currentIndexRef.current === 0
        ? totalSlides - 4
        : currentIndexRef.current - 1;
    if (currentIndexRef.current === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(newIndex);
      }, 1000);
    }
    setCurrentIndex(newIndex);

    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 500);
  }, [isMobile, totalSlides, stopSlider, setCurrentIndex, canScrollPrev]);

  // Обработчики для всей области слайдера
  const handleSliderAreaEnter = useCallback(() => {
    stopSlider();
  }, [stopSlider]);

  const handleSliderAreaLeave = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) return;

      if (isManualScrollRef.current) {
        return;
      }

      const relatedTarget = e.relatedTarget as HTMLElement;
      const isStillInSliderArea = relatedTarget?.closest(
        `.${styles.sliderWithControls}`
      );

      if (isStillInSliderArea) {
        return;
      }

      startSliderWithDelay();
    },
    [isMobile, startSliderWithDelay]
  );

  const handleCardHover = useCallback(
    (index: number) => {
      if (isMobile) return;

      const now = Date.now();

      // Защита от частых переключений
      if (isSwitching || now - lastLoadedTime < 2000) {
        return;
      }

      setIsSwitching(true);
      setLastLoadedTime(now);

      // Сначала скрываем текущий гист для плавной анимации
      setHoveredIndex(null);

      // Затем через задержку показываем новый
      setTimeout(() => {
        setHoveredIndex(index);
        setIsSwitching(false);
      }, 2000); // Задержка для плавной смены
    },
    [isMobile, isSwitching, lastLoadedTime]
  );

  // Эффект для управления анимацией слайдера
  useEffect(() => {
    if (!isMobile && visibleStates[0] && data.length > 0) {
      startInterval();
    }
  }, [isMobile, visibleStates, data.length, startInterval]);

  // Эффект для очистки при размонтировании
  useEffect(() => {
    if (isMobile || !visibleStates[0] || totalSlides <= 3) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [isMobile, totalSlides, visibleStates]);

  useEffect(() => {
    if (isMobile || !isTransitioning) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsTransitioning(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, [isMobile, isTransitioning]);

  const displayData = isMobile ? data : extendedSlides;

  return (
    <>
      <div className={`${styles.title}`}>My Expertise</div>
      <div className={styles.sliderWrapper}>
        <div
          className={styles.sliderArea}
          onMouseEnter={handleSliderAreaEnter}
          onMouseLeave={handleSliderAreaLeave}
        >
          <div className={styles.sliderWithControls}>
            <div
              ref={setRef(0)}
              className={`${styles.sliderContainer} ${
                isMobile ? styles.mobileContainer : ""
              }`}
            >
              {isMobile ? (
                <div className={styles.verticalList}>
                  {displayData.map((item, index) => (
                    <div
                      key={`mobile-slide-${index}`}
                      className={styles.verticalSlide}
                    >
                      <TechStackCard
                        logo={item.logo}
                        title={item.title}
                        description={item.description}
                        gist={item.gist}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className={styles.sliderTrack}
                  style={{
                    transform: `translateX(${
                      -currentIndexRef.current * slideWidth
                    }px)`,
                    transition: isTransitioning
                      ? "transform 1s ease-in-out"
                      : "none",
                  }}
                >
                  {displayData.map((item, index) => (
                    <div
                      key={`slide-${index}`}
                      className={styles.slide}
                      onMouseEnter={() => handleCardHover(index)}
                      onMouseLeave={() => {
                        if (isMobile) return;
                      }}
                    >
                      <TechStackCard
                        logo={item.logo}
                        title={item.title}
                        description={item.description}
                        gist={item.gist}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!isMobile && (
              <>
                <div
                  className={`${styles.chevronLeft} ${
                    !canScrollPrev ? styles.chevronDisabled : ""
                  }`}
                  onClick={scrollToPrev}
                >
                  <div className={styles.chevronIcon} />
                </div>

                <div
                  className={`${styles.chevronRight} ${
                    !canScrollNext ? styles.chevronDisabled : ""
                  }`}
                  onClick={scrollToNext}
                >
                  <div className={styles.chevronIcon} />
                </div>
              </>
            )}
          </div>
        </div>

        {!isMobile && (
          <div className={styles.indicatorWrapper}>
            <GistViewer
              content={
                hoveredIndex !== null
                  ? extendedSlides[hoveredIndex]?.content
                  : undefined
              }
              isVisible={hoveredIndex !== null}
              onLoaded={() => setLastLoadedTime(Date.now())}
            />
            <SpeedIndicator
              scrollSpeed={scrollSpeed}
              isPaused={isPaused}
              onSpeedChange={handleSpeedChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TechStackSlider;
