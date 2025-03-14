import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRoom, updateBoard } from "@/utils/roomUtils";
import { RoomData } from "@/types/roomTypes";

export const createRoomAsync = createAsyncThunk(
  "room/createRoom",
  async (host: any) => {
    const roomId = await createRoom(host);
    return roomId;
  }
);

export const makeMoveAsync = createAsyncThunk(
  "room/makeMove",
  async ({
    roomId,
    index,
    playerUid,
  }: {
    roomId: string;
    index: number;
    playerUid: string;
  }) => {
    await updateBoard(roomId, index, playerUid);
    return { index, playerUid };
  }
);

interface RoomState {
  roomId?: string;
  roomData?: RoomData;
  status: "idle" | "loading" | "failed";
}

const initialState: RoomState = {
  status: "idle",
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomData: (state, action) => {
      state.roomData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRoomAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createRoomAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.roomId = action.payload;
      })
      .addCase(createRoomAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(makeMoveAsync.fulfilled, (state, action) => {
        if (state.roomData) {
          const { index, playerUid } = action.payload;
          const symbol =
            playerUid === state.roomData.host.uid
              ? state.roomData.host.symbol
              : state.roomData.opponent?.symbol || "";
          state.roomData.currentRound.board[index] = symbol;
          state.roomData.currentRound.turn =
            playerUid === state.roomData.host.uid
              ? state.roomData.opponent!.uid
              : state.roomData.host.uid;
        }
      });
  },
});

export const { setRoomData } = roomSlice.actions;
export default roomSlice.reducer;
