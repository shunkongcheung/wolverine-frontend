import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { getFirebaseApp } from "../utils";

type Stage =
  | "lobby"
  | "wolf"
  | "prophet"
  | "witch"
  | "discuss"
  | "vote"
  | "finish";

interface RoundState {
  // meta information
  roomId: string;
  stage: Stage;
  winners: string;

  // roles
  farmers: Array<string>;
  prophets: Array<string>;
  witches: Array<string>;
  wolfKings: Array<string>;
  wolfs: Array<string>;

  // aliving people
  alives: Array<string>;
}

function useRound(roundId: string, initialValues: RoundState) {
  const [state, setState] = useState<RoundState>(initialValues);

  useEffect(() => {
    getFirebaseApp();
    const db = getFirestore();
    onSnapshot(doc(db, "rounds", roundId), (doc) => {
      const result = doc.data() as RoundState;
      setState(result);
    });
  }, [setState, roundId]);

  return state;
}

export default useRound;
