"use client"
import GameContainer from "./components/GameContainer/GameContainer";
import RoomOptions from "./components/RoomOptions/RoomOptions";
import TictacproText from "./components/TicTacProText/TictacproText";
import styles from "./Home.module.scss";
import withAuth from "@/hoc/withAuth";

function Home() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.gameContainer}>
        <RoomOptions />
      </div>

      <TictacproText />
    </div>
  );
}

export default withAuth(Home);
