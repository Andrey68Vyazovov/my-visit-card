import { useEffect, useState } from "react";

export const useAnimation = (isOpen: boolean) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      // Задержка для анимации закрытия
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  return isVisible;
};