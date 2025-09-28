import styles from './App.module.scss';
import  BackgroundAnimation  from './components/BackgroundAnimation';
import MainContent from './components/Content';

function App() {
  return (
    <div className={styles.app}>
      <BackgroundAnimation />
      <MainContent />
    </div>
  );
}

export default App;