import React, { memo, useMemo } from "react";
import styled from "styled-components";

import { Header } from "../../components";
import Lobby from "./Lobby";
import Prophet from "./Prophet";
import Witch from "./Witch";
import WolfKill from "./WolfKill";
import Vote from "./Vote";

type Stage =
  | "lobby"
  | "wolf"
  | "prophet"
  | "witch"
  | "vote"
  | "discuss"
  | "finish";

type Winners = "farmer" | "wolf" | "";

type Role = "farmer" | "wolf" | "prophet" | "witch" | "wolf-king";

interface HomeProps {
  alives: Array<string>;
  isHealed: boolean;
  isPoisoned: boolean;
  killing: string;
  poisoning: string;
  role: Role;
  roundId: string;
  votes: Array<string>;
  winners: Winners;
  wolfs: Array<string>;
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
  isHealed,
  isPoisoned,
  killing,
  poisoning,
  role,
  roundId,
  stage,
  votes,
  winners,
  wolfs,
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

  const isCurrRole =
    (stage === "wolf" && isWolf) ||
    (stage === "witch" && isWitch) ||
    (stage === "prophet" && isProphet) ||
    stage === "vote";
  return (
    <Container>
      <Header>{stageTxt}</Header>
      {stage === "lobby" && (
        <Lobby isWaitingForBegin winners={winners} roundId={roundId} />
      )}
      {stage === "finish" && <Lobby winners={winners} roundId={roundId} />}
      {!isCurrRole && <Lobby winners={winners} roundId={roundId} />}
      {stage === "wolf" && isCurrRole && (
        <WolfKill alives={alives} roundId={roundId} />
      )}
      {stage === "witch" && isCurrRole && (
        <Witch
          alives={alives}
          isHealed={isHealed}
          isPoisoned={isPoisoned}
          killing={killing}
          roundId={roundId}
        />
      )}
      {stage === "prophet" && isCurrRole && (
        <Prophet
          alives={alives}
          killing={killing}
          poisoning={poisoning}
          wolfs={wolfs}
          roundId={roundId}
        />
      )}
      {stage === "vote" && (
        <Vote
          alives={alives}
          killing={killing}
          poisoning={poisoning}
          roundId={roundId}
          votes={votes}
        />
      )}
    </Container>
  );
};

export default memo(Home);
