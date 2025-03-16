"use client";
import React from "react";
import Link from "next/link";
import withNonAuth from "@/hoc/withNonAuth";
import styles from "./LandingPage.module.scss";

function LandingPage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Multiplayer Tic Tac Toe!</h1>
      <p>
        Challenge your friends or compete with players around the world in real-time!
      </p>
      <ul className={styles.features}>
        <li>Real-time multiplayer matches</li>
        <li>Invite and challenge friends</li>
        <li>Leaderboards and rankings</li>
        <li>Responsive and interactive gameplay</li>
      </ul>
      <Link href="/auth">
        <button className={styles.button}>Start Playing</button>
      </Link>
    </div>
  );
}

export default withNonAuth(LandingPage);


