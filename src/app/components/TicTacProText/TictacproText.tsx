
import styles from "./TictacproText.module.scss";

const TictacproText = () => {
  return (
    <div className={styles.bottomText}>
      <div className={styles.primaryText}>tic.</div>
      <div className={styles.secondaryText}>tac.</div>
      <div className={styles.primaryText}>pro.</div>
    </div>
  );
};

export default TictacproText;