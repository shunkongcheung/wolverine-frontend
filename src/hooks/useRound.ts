import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
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
  poisoning: string;
  isHealed: boolean;
  isPoisoned: boolean;
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
    poisoning: "",
    isHealed: false,
    isPoisoned: false,
  });

  useEffect(() => {
    getFirebaseApp();
    const db = getFirestore();
    onSnapshot(doc(db, "rounds", roundId), (doc) => {
      const result = doc.data() as RoundState;
      setState(result);
    });
  }, [setState, roundId]);

  useEffect(() => {
    // periodically check if stage needs to be updated
    getFirebaseApp();
    const db = getFirestore();
    const docRef = doc(db, "rounds", roundId);

    onSnapshot(docRef, (doc) => {
      const result = doc.data() as RoundState;

      const needRandTime =
        (result.stage === "prophet" && !result.prophets.length) ||
        (result.stage === "witch" && !result.witches.length);

      if (needRandTime) {
        let nextStage = "";
        if (result.stage === "witch") nextStage = "prophet";
        if (result.stage === "prophet") nextStage = "vote";

        const randMilli = (15 + 5 * Math.random()) * 1000;
        setTimeout(() => {
          setDoc(docRef, { stage: nextStage }, { merge: true });
        }, randMilli);
      }
    });
  }, [setState, roundId]);

  return state;
}

export default useRound;
