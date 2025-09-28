import styles from "./index.module.scss";

import HeroSection from "../HeroSection";
import TechStackSlider from "../StackSlider";
import Contacts from "../Contacts";
import MyWork from "../MyWork";
import { stackArray } from "../index.const";

const CvContent = () => {
  return (
    <div className={styles.cvContent}>
      <HeroSection />
      {/* <div 
        ref={setRef(0)}
        className={`${styles.subtitle} ${visibleStates[0]  ? styles.visible : ''}`}
      > */}
      <TechStackSlider data={stackArray} />
      <MyWork />
      <Contacts />
    </div>
  );
};

export default CvContent;
