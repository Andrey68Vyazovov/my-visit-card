import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.module.scss';

interface GistViewerProps {
  content: string | undefined; // Код из TechStackItem.content
  isVisible: boolean; // Показывать ли (с анимацией)
  onLoaded: () => void; // Callback после завершения анимации
}

const GistViewer = ({ content, isVisible, onLoaded }: GistViewerProps) => {
  const [displayedContent, setDisplayedContent] = useState<string | undefined>(undefined);

  // Отслеживаем завершение анимации для вызова onLoaded (cooldown)
  useEffect(() => {
    if (isVisible && content && displayedContent !== content) {
      setDisplayedContent(content);
      const timer = setTimeout(() => {
        onLoaded(); // Вызываем onLoaded после завершения fade-in
      }, 2000); // 2 секунды для fade-in
      return () => clearTimeout(timer);
    } else if (!isVisible && displayedContent) {
      const timer = setTimeout(() => {
        setDisplayedContent(undefined); // Сбрасываем displayedContent после fade-out
      }, 2000); // 2 секунды для fade-out
      return () => clearTimeout(timer);
    }
  }, [isVisible, content, onLoaded, displayedContent]);

  const hasContent = !!displayedContent;

  return (
    <div
      className={`${styles.viewerContainer} ${isVisible && hasContent ? styles.visible : styles.hidden}`}
    >
      {hasContent ? (
        <SyntaxHighlighter
          language="typescript"
          style={tomorrow}
          customStyle={{ margin: 0, fontSize: '16px', background: 'transparent' }}
          className={styles.codeBlock}
        >
          {displayedContent}
        </SyntaxHighlighter>
      ) : (
        <p className={styles.error}>No code available.</p>
      )}
    </div>
  );
};

export default GistViewer;