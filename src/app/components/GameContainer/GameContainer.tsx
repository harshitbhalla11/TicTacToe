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

  const handleMove = (index: number) => {
    console.log('user move')
    console.log('isPlayerTurn',isPlayerTurn)
    if (!isPlayerTurn || board[index] !== "" || !currentUser) return; 
    console.log("Making a move...");
    dispatch(makeMoveAsync({ roomId, index, playerUid: currentUser.uid }));
  };

  const handleNewGame = () => {
    console.log("Starting a new game...");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.turnIndicator}>
        {roomData.currentRound.winner 
          ? `Winner: ${roomData.currentRound.winner === roomData.host.uid ? "Player X" : "Player O"}`
          : isPlayerTurn 
          ? "Your Turn" 
          : "Opponent's Turn"
        }
      </h2>

      <div className={styles.scoreboard}>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>{`${roomData.host.displayName} ${roomData.host.symbol}`}</span>
          <span className={styles.scoreValue}>{playerXScore}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>Draw</span>
          <span className={styles.scoreValue}>{drawScore}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreLabel}>
          {`${roomData.opponent?.displayName} ${roomData.opponent?.symbol}`}
            </span>
          <span className={styles.scoreValue}>{playerOScore}</span>
        </div>
      </div>

      <GameBoard board={board} onMove={handleMove} />

      {/* <button className={styles.newGameButton} onClick={handleNewGame} disabled={!roomData.currentRound.winner}>
        New Game
      </button> */}
    </div>
  );
}
