"use client";
import React from "react";
import styles from "./GameBoard.module.scss";

interface GameBoardProps {
  board: string[];
  onMove: (index: number) => void;
  gameOver: boolean;
  hostSymbol: string;
}

const GameBoard = ({ board, onMove, gameOver ,hostSymbol}: GameBoardProps) => {
  return (
    <div className={styles.board}>
      {board.map((cell, index) => (
        <button
          key={index}
          className={styles.cell}
          onClick={() => onMove(index)}
          disabled={gameOver || cell !== ""}
        >
          {cell === "X" ? <div className={`${hostSymbol=='X'?styles.hostSymbol:styles.oppSymbol} ${styles.symbolX}`}>X</div> :
         cell === "O" ?  <div className={`${hostSymbol=='O'?styles.hostSymbol:styles.oppSymbol} ${styles.symbolO}`}>O</div>    :''       }
        </button>
      ))}
    </div>
  );
};

export default GameBoard;
