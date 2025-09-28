import styles from "./index.module.scss";
import Header from "./Header";
import CvContent from "./CvContent";
import Footer from "./Footer";

const MainContent = () => {
  return (
    <div className={styles.content}>
      <Header />
      <CvContent />
      <Footer />
    </div>
  );
};

export default MainContent;
