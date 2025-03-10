// redux/slices/roomSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createRoom } from "@/utils/roomUtils";
import { RoomData } from "@/types/roomTypes";

export const createRoomAsync = createAsyncThunk(
  "room/createRoom",
  async (host: any) => {
    const roomId = await createRoom(host);
    return roomId;
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
      });
  },
});

export const { setRoomData } = roomSlice.actions;
export default roomSlice.reducer;
