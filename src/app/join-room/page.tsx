"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./JoinRoom.module.scss";
import TictacproText from "../components/TicTacProText/TictacproText";
import withAuth from "@/hoc/withAuth";

const JoinRoomPage = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleNavigateToRoom = () => {
    if (!roomCode.trim()) {
      setError("Please enter a room code.");
      return;
    }
    setError("");
    router.push(`/join-room/${roomCode}`);
  };

  return (
    <>
      <TictacproText />
      <div className={styles.joinRoomContainer}>
      <h2>Enter a Room Code</h2>
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className={styles.roomInput}
        maxLength={5}
      />
      <button onClick={handleNavigateToRoom} className={styles.joinButton}>
        Proceed
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </div>
    </>
   

  );
};

export default withAuth(JoinRoomPage);
