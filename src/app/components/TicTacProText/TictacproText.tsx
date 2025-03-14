
import styles from "./TictacproText.module.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const TictacproText = () => {
  return (
    <div className={`${styles.bottomText} ${poppins.className}`}>
      <div className={styles.primaryText}>tic.</div>
      <div className={styles.secondaryText}>tac.</div>
      <div className={styles.primaryText}>pro.</div>
    </div>
  );
};


export default TictacproText;