// GameContainer/GameContainer.tsx
"use client";
import React, { useState } from "react";
import GameBoard from "../GameBaord/GameBoard";
import styles from "./GameContainer.module.scss";
import { RoomData } from "@/types/roomTypes";

export interface GameContainerProps {
  roomId: string;
  roomData: RoomData;
}

export default function GameContainer({ roomId, roomData }: GameContainerProps) {
  // Derived states for scoreboard and board from roomData
  const playerXScore = roomData.overall.hostWins;
  const playerOScore = roomData.overall.opponentWins;
  const drawScore = roomData.overall.draws;
  const board = roomData.currentRound.board || Array(9).fill("");

  const handleNewGame = () => {
    console.log("Starting a new game...");
    // TODO: Implement resetting the currentRound in the DB
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.userName}>
        Welcome, {roomData.host.displayName || "Guest"}!
      </h2>

      <div className={styles.scoreboard}>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Player X</span>
          <span className={styles.scoreValue}>{playerXScore}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Draw</span>
          <span className={styles.scoreValue}>{drawScore}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Player O</span>
          <span className={styles.scoreValue}>{playerOScore}</span>
        </div>
      </div>

      <GameBoard board={board} />

      <button className={styles.newGameButton} onClick={handleNewGame}>
        New Game
      </button>
    </div>
  );
}
