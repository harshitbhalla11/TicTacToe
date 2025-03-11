"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ref, get, update } from "firebase/database";
import { db } from "@/app/firebase";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import styles from "../JoinRoom.module.scss"; 

const RoomDetailsPage = ({ params }: { params: { roomid: string } }) => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const [roomData, setRoomData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomRef = ref(db, `rooms/${params.roomid}`);
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
  }, [params.roomid]);

  const handleJoinRoom = async () => {
    if (!user) {
      setError("You must be logged in to join a room.");
      return;
    }

    if (roomData?.opponent) {
      setError("This room already has an opponent.");
      return;
    }

    try {
      const roomRef = ref(db, `rooms/${params.roomid}`);
      await update(roomRef, {
        opponent: {
          uid: user.uid,
          displayName: user.displayName || user.email,
        },
        status: "in_progress",
        updatedAt: { ".sv": "timestamp" },
      });

      router.push(`/room/${params.roomid}`);
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
          <h2>Room: {params.roomid}</h2>
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
