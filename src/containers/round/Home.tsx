import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";

import { Button, Header } from "../../components";
import { getFirebaseApp } from "../../utils";

type Stage =
  | "lobby"
  | "wolf"
  | "prophet"
  | "witch"
  | "discuss"
  | "vote"
  | "finish";

type Winners = "farmer" | "wolf" | "";

interface HomeProps {
  roundId: string;
  winners: Winners;
  stage: Stage;
}

const BtnContainer = styled.div`
  width: 400px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
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

const Home: React.FC<HomeProps> = ({ roundId, stage, winners }) => {
  const stageTxt = useMemo(() => {
    switch (stage) {
      case "lobby":
        return "大堂等待";
      case "wolf":
        return "狼人殺戮";
      case "prophet":
        return "預言家祈禱";
      case "witch":
        return "女巫用藥";
      case "discuss":
        return "討論";
      case "vote":
        return "表决";
      case "finish":
        return "完畢";
    }
  }, [stage]);

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
      <Header>{stageTxt}</Header>
      <Content>
        <WinnersDisplay url={`/${winners || "question-mark"}.png`} />
        <WinnersName>{winnersName}</WinnersName>
        {stage === "lobby" && (
          <BtnContainer>
            <Button handleClick={handleBegin}>開始</Button>
          </BtnContainer>
        )}
      </Content>
    </Container>
  );
};

export default memo(Home);
