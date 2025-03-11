import { ref, get, set, update, serverTimestamp } from "firebase/database";
import { db } from "@/app/firebase";
import { RoomData } from "@/types/roomTypes";

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

export async function updateBoard(roomId: string, index: number, playerUid: string): Promise<void> {
  const roomRef = ref(db, `rooms/${roomId}`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) throw new Error("Room does not exist");

  const roomData = snapshot.val();

  if (roomData.currentRound.turn !== playerUid || roomData.currentRound.board[index] !== "") {
    throw new Error("Invalid move");
  }

  const newBoard = [...roomData.currentRound.board];
  newBoard[index] = playerUid; 

  const winner = checkWinner(newBoard);

  await update(roomRef, {
    "currentRound/board": newBoard,
    "currentRound/turn": roomData.host.uid === playerUid ? roomData.opponent?.uid : roomData.host.uid,
    "currentRound/winner": winner || null, 
    updatedAt: { ".sv": "timestamp" },
  });
}

function checkWinner(board: string[]): string | null {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; 
    }
  }

  return null;
}


