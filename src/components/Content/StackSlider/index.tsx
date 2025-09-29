import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import TechStackCard from "../StackCard";
import SpeedIndicator from "./SpeedIndicator";
import styles from "./index.module.scss";
import { TechStackItem } from "../types";
import GistViewer from "./GistViewer";

interface TechStackProps {
  data: TechStackItem[];
  scrollSpeed?: number;
}

const TechStackSlider = ({
  data,
  scrollSpeed: initialScrollSpeed = 4000,
}: TechStackProps) => {
  const { setRef, visibleStates } = useScrollAnimation(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [scrollSpeed, setScrollSpeed] = useState(initialScrollSpeed);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastLoadedTime, setLastLoadedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Проверяем размер экрана
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const extendedSlides =
    data.length > 0
      ? [
          ...data,
          ...data.slice(0, 3),
        ]
      : [];

  const slideWidth = 360;
  const totalSlides = extendedSlides.length;

  const handleSpeedChange = () => {
    if (isMobile) return; // Отключаем смену скорости на мобильных
    
    const speeds = [4000, 2000, 1000];
    const currentIndex = speeds.indexOf(scrollSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setScrollSpeed(speeds[nextIndex] ?? scrollSpeed);
  };

  const startInterval = useCallback(() => {
    if (isMobile) return; // Отключаем интервал на мобильных
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(
      () => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;

          if (nextIndex >= totalSlides - 3) {
            setTimeout(() => {
              setIsTransitioning(false);
              setCurrentIndex(0);
              setIsFirstSlide(true);
            }, 1000);
            return nextIndex;
          }

          if (isFirstSlide) {
            setIsFirstSlide(false);
          }

          setIsTransitioning(true);
          return nextIndex;
        });
      },
      isFirstSlide || currentIndex >= totalSlides - 3
        ? scrollSpeed / 2
        : scrollSpeed
    );
  }, [isMobile, isFirstSlide, currentIndex, scrollSpeed, totalSlides]);

  const handleMouseEnter = () => {
    if (isMobile) return; // Отключаем паузу на мобильных
    
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    setIsPaused(false);
    setHoveredIndex(null);
    
    resumeTimeoutRef.current = setTimeout(() => {
      startInterval();
    }, 3000);
  };

  const handleCardHover = (index: number) => {
    if (isMobile) return;
    
    const now = Date.now();
    
    if (isSwitching || now - lastLoadedTime < 2000) {
      return;
    }
    
    setIsSwitching(true);
    setLastLoadedTime(now);
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    setHoveredIndex(null);
    
    setTimeout(() => {
      setHoveredIndex(index);
      setIsSwitching(false);
    }, 2000);
  };
  
  const handleSlideMouseLeave = () => {
    if (isMobile) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredIndex(null);
  };

  useEffect(() => {
    if (isMobile || !visibleStates[0] || totalSlides <= 3) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const timeoutId = setTimeout(
      () => {
        if (!isPaused) {
          startInterval();
        }
      },
      isFirstSlide ? scrollSpeed / 2 : scrollSpeed
    );

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [
    isMobile,
    totalSlides,
    isFirstSlide,
    currentIndex,
    scrollSpeed,
    isPaused,
    startInterval,
    visibleStates,
  ]);

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
          ref={setRef(0)}
          className={`${styles.sliderContainer} ${isMobile ? styles.mobileContainer : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
                transform: `translateX(${-currentIndex * slideWidth}px)`,
                transition: isTransitioning ? "transform 1s ease-in-out" : "none",
              }}
            >
              {displayData.map((item, index) => (
                <div
                  key={`slide-${index}`}
                  className={styles.slide}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={handleSlideMouseLeave}
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