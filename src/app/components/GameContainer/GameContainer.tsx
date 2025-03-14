"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { makeMoveAsync } from "@/redux/feature/roomSlice";
import GameBoard from "../GameBaord/GameBoard";
import styles from "./GameContainer.module.scss";
import { RoomData } from "@/types/roomTypes";

export interface GameContainerProps {
  roomId: string;
  roomData: RoomData;
}

export default function GameContainer({ roomId, roomData }: GameContainerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  
  const isPlayerTurn = roomData.currentRound.turn === currentUser?.uid;
  const board = roomData.currentRound.board || Array(9).fill("");

  const playerXScore = roomData.overall.hostWins;
  const playerOScore = roomData.overall.opponentWins;
  const drawScore = roomData.overall.draws;

  // Check if the round is finished (either win or draw)
  const isRoundFinished = roomData.currentRound.status === "finished";
  // Determine if it's a draw (finished but no winner)
  const isDraw = isRoundFinished && !roomData.currentRound.winner;
  // Game over when round is finished
  const gameOver = isRoundFinished;

  // Determine the header text based on game state
  const turnIndicatorText = isRoundFinished
    ? isDraw
      ? "Draw"
      : `Winner: ${roomData.currentRound.winner === roomData.host.symbol ? roomData.host.displayName : roomData.opponent?.displayName}`
    : isPlayerTurn
    ? "Your Turn"
    : "Opponent's Turn";

  const handleMove = (index: number) => {
    if (gameOver || !isPlayerTurn || board[index] !== "" || !currentUser) return; 
    dispatch(makeMoveAsync({ roomId, index, playerUid: currentUser.uid }));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.turnIndicator}>{turnIndicatorText}</h2>

      <div className={styles.scoreboard}>
        <div className={`${styles.score} ${styles.hostBoard}`}>
          <span className={styles.scoreLabel}>{`${roomData.host.displayName} ${roomData.host.symbol}`}</span>
          <span className={styles.scoreValue}>{playerXScore}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Draw</span>
          <span className={styles.scoreValue}>{drawScore}</span>
        </div>
        <div className={`${styles.score} ${styles.oppBoard}`}>
          <span className={styles.scoreLabel}>
            {`${roomData.opponent?.displayName} ${roomData.opponent?.symbol}`}
          </span>
          <span className={styles.scoreValue}>{playerOScore}</span>
        </div>
      </div>

      <GameBoard board={board} onMove={handleMove} gameOver={gameOver} hostSymbol={roomData.host.symbol} />
    </div>
  );
}
