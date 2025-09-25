// src/App.tsx
import  BackgroundAnimation  from './components/BackgroundAnimation';
import styles from './App.module.scss';
import Content from './components/Content';

function App() {
  return (
    <div className={styles.app}>
      <BackgroundAnimation />
      <Content />
    </div>
  );
}

export default App;