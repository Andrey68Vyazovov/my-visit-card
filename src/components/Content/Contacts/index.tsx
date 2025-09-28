import ContactCard from "./ConstactCard/index.tsx";
import { contactsData, contactsTitle } from "../index.const.ts";
import styles from "./index.module.scss";

const Contacts = () => {
  const handleClick = (type: string) => {
    const contact = contactsData.find((item) => item.type === type);
    if (!contact) return;

    switch (type) {
      case "phone":
        navigator.clipboard.writeText(contact.action);
        alert("Phone number copied to clipboard!");
        break;
      case "email":
        window.location.href = `mailto:${contact.action}`;
        break;
      case "telegram":
      case "github":
        window.open(contact.action, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.contactSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Contacts</h2>
          <div className={styles.description}>
            <p className={styles.frame}>{contactsTitle}</p>
          </div>
        </header>
      </div>
      <div className={styles.cardsContainer}>
        {contactsData.map((contact, index) => (
          <ContactCard
            key={index}
            type={contact.type}
            action={contact.action}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;