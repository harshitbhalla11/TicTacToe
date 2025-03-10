"use client";
import { useRouter } from "next/navigation";
import styles from "./RoomOptions.module.scss";
import { FaPlus, FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { createRoomAsync } from "@/redux/feature/roomSlice";
import withAuth from "@/hoc/withAuth";

const RoomOptions = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleCreateRoom = async () => {
    if (!user) {
      console.error("No user is logged in.");
      return;
    }
    try {
      const host = { uid: user.uid, displayName: user.displayName || user.email };

      const resultAction = await dispatch(createRoomAsync(host));

      if (createRoomAsync.fulfilled.match(resultAction)) {
        const roomId = resultAction.payload;
        router.push(`/room/${roomId}`);
      } else {
        console.error("Failed to create room:", resultAction);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = () => {
    router.push("/join-room");
  };

  return (
    <div className={styles.roomOptionsContainer}>
      <button className={styles.optionButton} onClick={handleCreateRoom}>
        <FaPlus className={styles.icon} /> Create Room
      </button>
      <button className={styles.optionButton} onClick={handleJoinRoom}>
        <FaSignInAlt className={styles.icon} /> Join Room
      </button>
    </div>
  );
};

export default withAuth(RoomOptions);
