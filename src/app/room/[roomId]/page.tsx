"use client";

import { useParams } from "next/navigation";
import { ref, onValue, update } from "firebase/database";
import { db } from "@/app/firebase";
import GameContainer from "@/app/components/GameContainer/GameContainer";
import { useEffect, useState } from "react";
import { RoomData } from "@/types/roomTypes";
import styles from "./RoomPage.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const RoomPage = () => {
  const { roomId } = useParams() as { roomId: string };
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [invitationLink, setInvitationLink] = useState<string>("");
  const user = useSelector((state: RootState) => state.auth.user);

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

  const selectSymbol = async (symbol: "X" | "O") => {
    if (!roomData || !user) return;
    if (user.uid !== roomData.host.uid) return;

    if (roomData.host.symbol === symbol) return;

    const newOpponentSymbol = symbol === "X" ? "O" : "X";
    const roomRef = ref(db, `rooms/${roomId}`);
    const updates: any = {
      "host/symbol": symbol,
      updatedAt: { ".sv": "timestamp" },
    };

    if (roomData.opponent) {
      updates["opponent/symbol"] = newOpponentSymbol;
    } else {
      updates["opponentSymbol"] = newOpponentSymbol;
    }

    await update(roomRef, updates);
  };

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
            <p>
              <strong>Host:</strong> {roomData.host?.displayName || "Unknown"}
            </p>
          </div>

          {user && user.uid === roomData.host.uid && (
            <div className={styles.toggleContainer}>
              <p>Select Symbol:</p>
              <div className="btn-group" role="group" aria-label="Symbol toggle">
                <input
                  type="radio"
                  className="btn-check"
                  name="symbolOptions"
                  id="symbolX"
                  autoComplete="off"
                  checked={roomData.host.symbol === "X"}
                  onChange={() => selectSymbol("X")}
                />
                <label className="btn btn-outline-primary" htmlFor="symbolX">
                  X
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="symbolOptions"
                  id="symbolO"
                  autoComplete="off"
                  checked={roomData.host.symbol === "O"}
                  onChange={() => selectSymbol("O")}
                />
                <label className="btn btn-outline-primary" htmlFor="symbolO">
                  O
                </label>
              </div>
            </div>
          )}
        </div>
      ) : (
        <GameContainer roomId={roomId} roomData={roomData} />
      )}
    </div>
  );
};

export default RoomPage;
