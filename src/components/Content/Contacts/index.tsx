import ContactCard from './ConstactCard/index.tsx';
import { contactsData } from '../index.const.ts';
import styles from './index.module.scss';


const Contacts = () => {
  const handleClick = (type: string) => {
    const contact = contactsData.find((item) => item.type === type);
    if (!contact) return;

    switch (type) {
      case 'phone':
        navigator.clipboard.writeText(contact.action);
        alert('Phone number copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:${contact.action}`;
        break;
      case 'telegram':
      case 'github':
        window.open(contact.action, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {contactsData.map((contact, index) => (
        <ContactCard
          key={index}
          type={contact.type}
          action={contact.action}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default Contacts;