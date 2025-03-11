"use client";
import React from "react";
import styles from "./GameBoard.module.scss";

interface GameBoardProps {
  board: string[];
  onMove: (index: number) => void;
}

const GameBoard = ({ board, onMove }: GameBoardProps) => {
  return (
    <div className={styles.board}>
      {board.map((cell, index) => (
        <button
          key={index}
          className={styles.cell}
          onClick={() => onMove(index)}
          disabled={cell !== ""}
        >
          {cell === "X" ? "❌" : cell === "O" ? "⭕" : ""}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
