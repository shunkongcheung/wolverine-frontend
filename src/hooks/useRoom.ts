import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getFirebaseApp } from "../utils";

interface RoomState {
  // meta
  createdBy: string;
  currentRound: string;

  // people who joined
  joined: Array<string>;

  // counts of each roles
  farmer: number;
  witch: number;
  wolf: number;
  wolfKing: number;
}

function useRoom(roomId: string, initialValues: RoomState) {
  const [state, setState] = useState<RoomState>(initialValues);

  useEffect(() => {
    getFirebaseApp();
    const db = getFirestore();
    onSnapshot(doc(db, "rooms", roomId), (doc) => {
      const result = doc.data() as RoomState;
      setState(result);
    });
  }, [setState, roomId]);

  return state;
}

export default useRoom;