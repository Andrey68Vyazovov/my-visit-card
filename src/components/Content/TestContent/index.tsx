// src/components/TestContent/index.tsx
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import Terminal from "../../Terminal";
import { stackArray } from "../index.const";
import TechStackSlider from "../StackSlider";
import MyWork from "../MyWork";
import styles from "./index.module.scss";
import Contacts from "../Contacts";

const TestContent = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div className={styles.testContent}>
      <div className={styles.name}>
        ANDREY VYAZOVOV
        <div className={styles.title}>
          FRONT-END DEVELOPER
          <Terminal />
        </div>
      </div>
      <div 
        ref={ref}
        className={`${styles.subtitle} ${isVisible ? styles.visible : ''}`}
      >
        My Expertise
      </div>
      <TechStackSlider data={stackArray}/>
      <MyWork />
      <div 
        ref={ref}
        className={`${styles.subtitle} ${isVisible ? styles.visible : ''}`}
      >
        Contacts
      </div>
      <Contacts />
    </div>
  );
};

export default TestContent;
