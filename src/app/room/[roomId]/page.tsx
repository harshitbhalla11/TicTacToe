"use client";

import { useParams } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebase";
import GameContainer from "@/app/components/GameContainer/GameContainer";
import { useEffect, useState } from "react";
import { RoomData } from "@/types/roomTypes";
import styles from "./RoomPage.module.scss";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const RoomPage = () => {
  const { roomId } = useParams() as { roomId: string };
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [invitationLink, setInvitationLink] = useState<string>("");

  useEffect(() => {
    if (!roomId) return;

    if (typeof window !== "undefined") {
      setInvitationLink(`${window.location.origin}/join-room/${roomId}`);
    }

    const roomRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      setRoomData(snapshot.val());
    });

    return () => unsubscribe();
  }, [roomId]);

  if (!roomData) {
    return (
      <div className={styles.roomContainer}>
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.roomContainer}>
      {!roomData.opponent ? (
        <div className={styles.roomDetails}>
          <h2>
            Waiting for opponent to join
            <div className="spinner-grow text-warning me-2" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </h2>

          <p>Invite a friend using this room code:</p>
          <p className={styles.roomCode}>{roomId}</p>

          <p>Share this link:</p>
          <p>
            <a href={invitationLink} className={styles.inviteLink}>
              {invitationLink || "Invite Link"}
            </a>
          </p>

          <div className={styles.playerInfo}>
            <h3>Players in the room:</h3>
            <p><strong>Host:</strong> {roomData.host?.displayName || "Unknown"}</p>
          </div>
        </div>
      ) : (
        <GameContainer roomId={roomId} roomData={roomData} />
      )}
    </div>
  );
};

export default RoomPage;
