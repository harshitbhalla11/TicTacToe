"use client";
import React from "react";
import styles from "./GameBoard.module.scss";

interface GameBoardProps {
  board: string[];
}

const GameBoard = ({ board }: GameBoardProps) => {
  const renderCell = (index: number) => (
    <div className={styles.cell} key={index}>
      {board[index]}
    </div>
  );

  return <div className={styles.board}>{board.map((_, index) => renderCell(index))}</div>;
};

export default GameBoard;
