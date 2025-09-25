// src/components/Content/Terminal/index.tsx
// import { useState, useEffect } from 'react';
import styles from './index.module.scss';

const Terminal = () => {
  // const [showCursor, setShowCursor] = useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowCursor(prev => !prev);
  //   }, 1500);
    
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className={styles.terminal}>
      <span className={styles.text}>{'> ready for new challenges...'}</span>
      {/* {showCursor && <span className={styles.cursor}>█</span>} */}
    </div>
  );
};

export default Terminal;