// utils/roomUtils.ts
import { ref, get, set, update, serverTimestamp } from "firebase/database";
import { db } from "@/app/firebase";
import { RoomData } from "@/types/roomTypes";

// Generate a random 5-digit room ID (as a string)
export const generateRoomId = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export async function createRoom(host: { uid: string; displayName?: string }): Promise<string> {
  const roomData: RoomData = {
    host,
    opponent: null,
    currentRound: {
      board: ["", "", "", "", "", "", "", "", ""],
      turn: host.uid,
      status: "waiting",
      winner: null,
      roundNumber: 1,
      startedAt: { ".sv": "timestamp" },
    },
    overall: {
      hostWins: 0,
      opponentWins: 0,
      draws: 0,
    },
    createdAt: { ".sv": "timestamp" },
    updatedAt: { ".sv": "timestamp" },
  };

  let roomId: string;
  let roomRef;
  let roomSnapshot;
  do {
    roomId = generateRoomId();
    roomRef = ref(db, `rooms/${roomId}`);
    roomSnapshot = await get(roomRef);
  } while (roomSnapshot.exists());

  await set(roomRef, roomData);
  return roomId;
}

// You could add additional functions such as joinRoom or updateRound here
