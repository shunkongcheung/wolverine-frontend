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

type Winners = "wolf" | "farmer" | "";

interface RoundState {
  // meta information
  roomId: string;
  stage: Stage;
  winners: Winners;

  // roles
  farmers: Array<string>;
  prophets: Array<string>;
  witches: Array<string>;
  wolfKings: Array<string>;
  wolfs: Array<string>;

  // aliving people
  alives: Array<string>;

  // gaming information
  votes: Array<string>;
  killing: string;
  isHealed: boolean;
  isPoisioned: boolean;
}

function useRound(roundId: string) {
  const [state, setState] = useState<RoundState>({
    roomId: "",
    stage: "lobby",
    winners: "",
    farmers: [],
    prophets: [],
    witches: [],
    wolfKings: [],
    wolfs: [],
    alives: [],
    votes: [],
    killing: "",
    isHealed: false,
    isPoisioned: false,
  });

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
