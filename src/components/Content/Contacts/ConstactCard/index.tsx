import { FaPhone, FaEnvelope, FaTelegramPlane, FaGithub } from 'react-icons/fa';
import styles from './index.module.scss';

interface ContactCardProps {
  type: 'phone' | 'email' | 'telegram' | 'github';
  action: string;
  onClick: (type: string) => void;
}

const ContactCard = ({ type, action, onClick }:ContactCardProps) => {
  const getIcon = () => {
    switch (type) {
      case 'phone':
        return <FaPhone size={150} />;
      case 'email':
        return <FaEnvelope size={150} />;
      case 'telegram':
        return <FaTelegramPlane size={150} />;
      case 'github':
        return <FaGithub size={150} />;
      default:
        return null;
    }
  };

  const handleClick = () => {
    onClick(type);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.icon}>{getIcon()}</div>
      <p className={styles.label}>{action}</p>
    </div>
  );
};

export default ContactCard;