import React, { memo, useMemo } from "react";
import styled from "styled-components";

import { Header } from "../../components";
import Lobby from "./Lobby";

type Stage =
  | "lobby"
  | "wolf"
  | "prophet"
  | "witch"
  | "discuss"
  | "vote"
  | "finish";

type Winners = "farmer" | "wolf" | "";

type Role = "farmer" | "wolf" | "prophet" | "witch" | "wolf-king";

interface HomeProps {
  alives: Array<string>;
  role: Role;
  roundId: string;
  winners: Winners;
  stage: Stage;
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Home: React.FC<HomeProps> = ({
  alives,
  role,
  roundId,
  stage,
  winners,
}) => {
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

  const isWolf = role === "wolf" || role === "wolf-king";
  const isProphet = role === "prophet";
  const isWitch = role === "witch";

  return (
    <Container>
      <Header>{stageTxt}</Header>
      {stage === "lobby" && (
        <Lobby isWaitingForBegin winners={winners} roundId={roundId} />
      )}
      {stage === "wolf" && isWolf && <WolfKill alives={alives} />}
      {stage === "wolf" && !isWolf && (
        <Lobby winners={winners} roundId={roundId} />
      )}
      {stage === "finish" && <Lobby winners={winners} roundId={roundId} />}
    </Container>
  );
};

export default memo(Home);
