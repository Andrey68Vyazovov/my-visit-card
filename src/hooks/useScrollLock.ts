import { useEffect } from "react";

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const body = document.body;
    
    if (isLocked) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = '';
      body.style.paddingRight = '';
    }
    
    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
    };
  }, [isLocked]);
};