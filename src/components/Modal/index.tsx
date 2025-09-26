import { createPortal } from "react-dom";
import { WorkCardData } from "../Content/types";
import styles from './index.module.scss';
import { useAnimation } from "../../hooks/useAnimation";
import { useState, useEffect } from "react";
import Slider from "./Slider";
import { FaTimes } from 'react-icons/fa';

interface WorkModalProps {
  work: WorkCardData | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkModal = ({ work, isOpen, onClose }: WorkModalProps) => {
  const isVisible = useAnimation(isOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); 

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  if (!isVisible || !work) return null;
  
  return createPortal(
    <div 
      className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`} 
      onClick={onClose}
    >
      <div 
        className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}><FaTimes /></button>
        
        <div className={styles.modalLayout}>
          {/* Верхняя часть - слайдер (60%) */}
          <div className={styles.sliderSection}>
          <Slider 
              images={work.images}
              currentSlide={currentSlide}
              onSlideChange={setCurrentSlide}
            />
          </div>
          
          {/* Нижняя часть - текстовый контент (40%) */}
          <div className={styles.contentSection}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{work.title}</h3>
              {/* <div className={styles.modalStack}>
                {work.stack.map((tech, index) => (
                  <span key={index} className={styles.techTag}>{tech}</span>
                ))}
              </div> */}
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.projectInfo}>
                <p>{work.images[currentSlide]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default WorkModal;