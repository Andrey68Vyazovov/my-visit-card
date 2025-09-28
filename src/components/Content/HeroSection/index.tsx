import Terminal from "../../Terminal";
import styles from "./index.module.scss";

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.desktopLayout}>
        <div className={styles.name}>
          ANDREY VYAZOVOV
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            FRONT-END DEVELOPER
          </div>
          <div className={styles.terminal}>
            <Terminal />
          </div>
        </div>
      </div>
      
      <div className={styles.mobileLayout}>
        <div className={styles.title}>FRONT-END DEVELOPER</div>
        <div className={styles.name}>ANDREY VYAZOVOV</div>
        <div className={styles.terminal}><Terminal /></div>
      </div>
    </div>
  );
};

export default HeroSection;