import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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

function useRoom(roomId: string) {
  const [state, setState] = useState<RoomState>({
    createdBy: "",
    currentRound: "",
    joined: [],
    farmer: -1,
    witch: -1,
    wolf: -1,
    wolfKing: -1,
  });

  const router = useRouter();

  const total = useMemo(() => {
    const prophetCount = 1;
    return (
      state.wolf + state.wolfKing + state.witch + state.farmer + prophetCount
    );
  }, [state]);

  useEffect(() => {
    getFirebaseApp();
    const db = getFirestore();
    onSnapshot(doc(db, "rooms", roomId), (doc) => {
      const result = doc.data() as RoomState;
      setState(result);

      if (result.currentRound) router.push(`/rounds/${result.currentRound}`);
    });
  }, [setState, roomId]);

  return { ...state, total };
}

export default useRoom;
