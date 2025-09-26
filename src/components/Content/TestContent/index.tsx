// src/components/TestContent/index.tsx
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";
import Terminal from "../../Terminal";
import { stackArray } from "../index.const";
import TechStackSlider from "../StackSlider";
import MyWork from "../MyWork";
import styles from "./index.module.scss";
import Contacts from "../Contacts";

const TestContent = () => {
  const { setRef, visibleStates  } = useScrollAnimation(2);
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
        ref={setRef(0)}
        className={`${styles.subtitle} ${visibleStates[0]  ? styles.visible : ''}`}
      >
        My Expertise
      </div>
      <TechStackSlider data={stackArray}/>
      <MyWork />
      <div 
        ref={setRef(1)}
        className={`${styles.subtitle} ${visibleStates[1]  ? styles.visible : ''}`}
      >
        Contacts
      </div>
      <Contacts />
    </div>
  );
};

export default TestContent;
