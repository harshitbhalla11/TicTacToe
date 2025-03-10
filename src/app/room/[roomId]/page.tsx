"use client";

import { useParams } from "next/navigation";
import { ref, onValue } from "firebase/database";
import { db } from "@/app/firebase";
import GameContainer from "@/app/components/GameContainer/GameContainer";
import { useEffect, useState } from "react";
import { RoomData } from "@/types/roomTypes";

const RoomPage = () => {
  const { roomId } = useParams() as { roomId: string };
  const [roomData, setRoomData] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!roomId) return;
    const roomRef = ref(db, `rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      setRoomData(snapshot.val());
    });
    return () => unsubscribe();
  }, [roomId]);

  if (!roomData) {
    return <div>Loading...</div>;
  }

  // Waiting screen if opponent hasn't joined
  if (!roomData.opponent) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Waiting for opponent to join...</h2>
        <p>
          Invite a friend using this room code: <strong>{roomId}</strong>
        </p>
        <p>
          Share this link:{" "}
          <a href={typeof window !== "undefined" ? window.location.href : "#"}>
            {typeof window !== "undefined" ? window.location.href : "Invite Link"}
          </a>
        </p>
      </div>
    );
  }

  return <GameContainer roomId={roomId} roomData={roomData} />;
};

export default RoomPage;
