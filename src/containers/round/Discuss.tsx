import {
  arrayRemove,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";

import { Button } from "../../components";
import { getFirebaseApp } from "../../utils";

interface DiscussProps {
  roundId: string;
  votes: Array<string>;
}

interface Map {
  [x: string]: number;
}

const BtnContainer = styled.div`
  margin-top: auto;
  margin-bottom: 50px;
  width: 300px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Message = styled.h2`
  color: ${({ theme }) => theme.colors.primary[700]};
`;

const Discuss: React.FC<DiscussProps> = ({ votes, roundId }) => {
  const voteOut = useMemo(() => {
    const map: Map = {};
    votes.map((itm) => {
      const voteTo = itm.split("-")[0];
      if (map[voteTo]) map[voteTo]++;
      else map[voteTo] = 1;
    });

    const [voteOut] = Object.entries(map).reduce(
      (acc, [key, count]) => {
        if (count > acc[1]) return [key, count];
        return acc;
      },
      ["invalid", -1]
    );

    if (voteOut === "invalid" || voteOut === "giveup") return "沒有人";
    return voteOut;
  }, []);

  const handleContinue = useCallback(async () => {
    getFirebaseApp();
    const db = getFirestore();

    // remove alive
    await setDoc(
      doc(db, "rounds", roundId),
      {
        alives: arrayRemove(voteOut),
        wolfs: arrayRemove(voteOut),
        wolfKings: arrayRemove(voteOut),
        prophets: arrayRemove(voteOut),
        witches: arrayRemove(voteOut),
        farmers: arrayRemove(voteOut),
      },
      { merge: true }
    );

    // fetch updated data
    const docRef = await getDoc(doc(db, "rounds", roundId));
    const { alives, wolfs, wolfKings } = docRef.data() as any;

    const wolfTotal = wolfs.length + wolfKings.length;

    let winners = "";
    if (alives.length <= wolfTotal) winners = "wolf";
    if (wolfTotal === 0) winners = "farmer";

    let stage = "wolf";
    if (winners) stage = "finish";

    await setDoc(
      doc(db, "rounds", roundId),
      { stage, killing: "", poisoning: "", votes: [], winners },
      { merge: true }
    );
  }, [voteOut, roundId]);

  return (
    <Container>
      <Message>{voteOut}被排除在外</Message>
      <BtnContainer>
        <Button handleClick={handleContinue}>繼續 </Button>
      </BtnContainer>
    </Container>
  );
};

export default memo(Discuss);
