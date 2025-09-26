import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (count: number) => {
  const [visibleStates, setVisibleStates] = useState<boolean[]>(
    Array(count).fill(false)
  );
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((element, index) => {
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry && entry.isIntersecting) {
              setVisibleStates(prev => {
                const newStates = [...prev];
                newStates[index] = true;
                return newStates;
              });
            }
          },
          { threshold: 0.3 }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [count]);

  const setRef = (index: number) => (element: HTMLDivElement | null) => {
    refs.current[index] = element;
  };

  return { setRef, visibleStates };
};