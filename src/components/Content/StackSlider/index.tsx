import { useCallback, useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import TechStackCard from "../StackCard";
import SpeedIndicator from "./SpeedIndicator";
import styles from "./index.module.scss";
import { TechStackItem } from "../types";
import GistViewer from "./GistViewer";

interface TechStackProps {
  data: TechStackItem[];
  scrollSpeed?: number; // Необязательный пропс для начальной скорости прокрутки (в мс)
}

const TechStackSlider = ({
  data,
  scrollSpeed: initialScrollSpeed = 4000,
}: TechStackProps) => {
  const { setRef, visibleStates  } = useScrollAnimation(1);
  const [currentIndex, setCurrentIndex] = useState(0); // Начинаем с первого оригинального слайда
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isFirstSlide, setIsFirstSlide] = useState(true); // Для начальной задержки
  const [scrollSpeed, setScrollSpeed] = useState(initialScrollSpeed); // Текущая скорость
  const [isPaused, setIsPaused] = useState(false); // Состояние паузы
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastLoadedTime, setLastLoadedTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null); 

  const extendedSlides =
    data.length > 0
      ? [
          // ...data.slice(-3),
          ...data,
          ...data.slice(0, 3),
        ]
      : [];

  const slideWidth = 360;
  const totalSlides = extendedSlides.length;

  // Переключение скорости
  const handleSpeedChange = () => {
    const speeds = [4000, 2000, 1000];
    const currentIndex = speeds.indexOf(scrollSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    setScrollSpeed(speeds[nextIndex] ?? scrollSpeed);
  };

  // Функция для запуска интервала прокрутки
  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(
      () => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;

          // Если дошли до первого дублированного слайда
          if (nextIndex >= totalSlides - 3) {
            // Мгновенно сбрасываем на первый оригинальный слайд
            setTimeout(() => {
              setIsTransitioning(false);
              setCurrentIndex(0); // Сбрасываем на первый оригинальный
              setIsFirstSlide(true); // Следующий интервал будет scrollSpeed/2
            }, 1000); // Ждем завершения анимации (1s)
            return nextIndex;
          }

          // Отключаем флаг isFirstSlide после первого слайда
          if (isFirstSlide) {
            setIsFirstSlide(false);
          }

          // Включаем анимацию для следующего перехода
          setIsTransitioning(true);
          return nextIndex;
        });
      },
      isFirstSlide || currentIndex >= totalSlides - 3
        ? scrollSpeed / 2
        : scrollSpeed
    );
  }, [isFirstSlide, currentIndex, scrollSpeed, totalSlides]);

  // Обработчик наведения мыши на слайдер
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Останавливаем прокрутку
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current); // Очищаем таймер возобновления
      resumeTimeoutRef.current = null;
    }
  };

  // Обработчик ухода мыши со слайдера
  const handleMouseLeave = () => {
    setIsPaused(false);
    resumeTimeoutRef.current = setTimeout(() => {
      startInterval(); // Возобновляем прокрутку через 3 секунды
    }, 3000); // Задержка 3 секунды после ухода мыши
  };

  const handleSlideMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredIndex(null); // Сбрасываем hoveredIndex после завершения анимации
    }, 2000); // Задержка 2 секунды для fade-out
  };

  useEffect(() => {
   if (!visibleStates[0] || totalSlides <= 3) {
  //  if (totalSlides <= 3) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    // Начальная прокрутка
    const timeoutId = setTimeout(
      () => {
        if (!isPaused) {
          startInterval();
        }
      },
      isFirstSlide ? scrollSpeed / 2 : scrollSpeed
    ); // Начальная задержка

    return () => {
      clearTimeout(timeoutId);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [totalSlides, isFirstSlide, currentIndex, scrollSpeed, isPaused, startInterval, visibleStates]);

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  return (
    <div className={styles.sliderWrapper}>
      <div
        ref={setRef(0)}
        className={styles.sliderContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={styles.sliderTrack}
          style={{
            transform: `translateX(${-currentIndex * slideWidth}px)`,
            transition: isTransitioning ? "transform 1s ease-in-out" : "none",
          }}
        >
          {extendedSlides.map((item, index) => (
            <div
              key={`slide-${index}`}
              className={styles.slide}
              onMouseEnter={() => {
                const now = Date.now();
                if (now - lastLoadedTime >= 2000) {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                  }
                  setHoveredIndex(index);
                }
              }}
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
      </div>
      <div className={styles.indicatorWrapper}>
      <GistViewer
          content={hoveredIndex !== null ? extendedSlides[hoveredIndex]?.content : undefined}
          isVisible={hoveredIndex !== null}
          onLoaded={() => setLastLoadedTime(Date.now())} // Устанавливаем cooldown после анимации
        />
        <SpeedIndicator
          scrollSpeed={scrollSpeed}
          isPaused={isPaused}
          onSpeedChange={handleSpeedChange}
        />
      </div>
    </div>
  );
};

export default TechStackSlider;
