import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './index.module.scss';

interface GistViewerProps {
  content: string | undefined;
  isVisible: boolean;
  onLoaded: () => void;
}

const GistViewer = ({ content, isVisible, onLoaded }: GistViewerProps) => {
  const [displayedContent, setDisplayedContent] = useState<string | undefined>(undefined);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isVisible && content && displayedContent !== content) {
      setAnimationKey(prev => prev + 1);
      setDisplayedContent(content);
      const timer = setTimeout(() => {
        onLoaded();
      }, 2000);
      return () => clearTimeout(timer);
    } else if (!isVisible && displayedContent) {
      const timer = setTimeout(() => {
        setDisplayedContent(undefined);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, content, onLoaded, displayedContent]);

  const hasContent = !!displayedContent;

  return (
    <div
      className={`${styles.viewerContainer} ${isVisible && hasContent ? styles.visible : styles.hidden}`}
    >
      {hasContent && (
        <div key={animationKey} className={styles.scrollableContent}>
          <SyntaxHighlighter
            language="typescript"
            style={tomorrow}
            customStyle={{ margin: 0, fontSize: '16px', background: 'transparent', padding: 0 }}
            wrapLines={true}
            className={styles.codeBlock}
          >
            {displayedContent}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default GistViewer;