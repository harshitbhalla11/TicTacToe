"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ref, get, update } from "firebase/database";
import { db } from "@/app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import styles from "../JoinRoom.module.scss";

const RoomDetailsPage = () => {
  const router = useRouter();
  const { roomid } = useParams(); 
  const user = useSelector((state: RootState) => state.auth.user);
  const [roomData, setRoomData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roomid) return;

    const fetchRoomDetails = async () => {
      try {
        const roomRef = ref(db, `rooms/${roomid}`);
        const snapshot = await get(roomRef);

        if (!snapshot.exists()) {
          setError("Room does not exist.");
          return;
        }

        const data = snapshot.val();
        setRoomData(data);
      } catch (err) {
        console.error("Error fetching room details:", err);
        setError("An error occurred while fetching room details.");
      }
    };

    fetchRoomDetails();
  }, [roomid]);

  const handleJoinRoom = async () => {
    if (!user) {
      setError("You must be logged in to join a room.");
      return;
    }
  
    if (roomData?.host?.uid === user.uid) {
      setError("You cannot join your own room as an opponent.");
      return;
    }
  
    if (roomData?.opponent) {
      setError("This room already has an opponent.");
      return;
    }
  
    try {
      const roomRef = ref(db, `rooms/${roomid}`);
      const opponentSymbol = roomData.host.symbol === "X" ? "O" : "X";

      await update(roomRef, {
        opponent: {
          uid: user.uid,
          displayName: user.displayName || user.email,
          symbol: opponentSymbol,
        },
        status: "in_progress",
        updatedAt: { ".sv": "timestamp" },
      });
  
      router.push(`/room/${roomid}`);
    } catch (err) {
      console.error("Error joining room:", err);
      setError("An error occurred while trying to join the room.");
    }
  };
  

  return (
    <div className={styles.joinRoomContainer}>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : roomData ? (
        <div className={styles.joinRoomDetails}>
          <h2>Room: {roomid}</h2>
          <p>Host: {roomData.host?.displayName || "Unknown"}</p>
          <p>Status: {roomData.status}</p>
          {!roomData.opponent ? (
            <button onClick={handleJoinRoom} className={styles.joinButton}>
              Join Room
            </button>
          ) : (
            <p>This room is full.</p>
          )}
        </div>
      ) : (
        <p>Loading room details...</p>
      )}
    </div>
  );
};

export default RoomDetailsPage;
