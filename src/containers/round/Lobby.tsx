import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";

import { Button } from "../../components";
import { getFirebaseApp } from "../../utils";

type Winners = "farmer" | "wolf" | "";

interface LobbyProps {
  isWaitingForBegin?: boolean;
  roundId: string;
  winners: Winners;
}

const BtnContainer = styled.div`
  width: 400px;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const WinnersName = styled.h3`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const WinnersDisplay = styled.div<{ url: string }>`
  width: 200px;
  height: 200px;
  background: url(${({ url }) => url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const Lobby: React.FC<LobbyProps> = ({
  isWaitingForBegin = false,
  roundId,
  winners,
}) => {
  const winnersName = useMemo(() => {
    if (winners === "wolf") return "狼人勝";
    if (winners === "farmer") return "農民勝";
    return "遊戲進行中";
  }, [winners]);

  const handleBegin = useCallback(() => {
    getFirebaseApp();
    const db = getFirestore();
    // begin the game
    setDoc(
      doc(db, "rounds", roundId),
      {
        stage: "wolf", // move to wolf
        votes: [],
        isPoisoned: false,
        isHealed: false,
      },
      { merge: true }
    );
  }, [roundId]);

  return (
    <Container>
      <WinnersDisplay url={`/${winners || "question-mark"}.png`} />
      <WinnersName>{winnersName}</WinnersName>
      {isWaitingForBegin && (
        <BtnContainer>
          <Button handleClick={handleBegin}>開始</Button>
        </BtnContainer>
      )}
    </Container>
  );
};

export default memo(Lobby);
