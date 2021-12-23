import type { GetServerSidePropsContext, NextPage } from "next";
import { useMemo, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { GiCrossedSwords } from "react-icons/gi";
import { RiCharacterRecognitionLine } from "react-icons/ri";
import styled from "styled-components";

import { TabContainer } from "../../components";
import { Alives, Character, Home, Vote } from "../../containers/round";
import { useAuthed, useRound } from "../../hooks";

interface RoundProps {
  roundId: string;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Round: NextPage<RoundProps> = (props) => {
  const { roundId } = props;

  const [tab, setTab] = useState("home");
  const round = useRound(roundId);

  const username = useAuthed();

  const type = useMemo(() => {
    const isWolf = round.wolfs.find((name) => name === username);
    if (isWolf) return "wolf";

    const isWolfKing = round.wolfKings.find((name) => name === username);
    if (isWolfKing) return "wolf-king";

    const isWitch = round.witches.find((name) => name === username);
    if (isWitch) return "witch";

    const isProphet = round.prophets.find((name) => name === username);
    if (isProphet) return "prophet";

    return "farmer";
  }, [username, round]);

  return (
    <Container>
      <TabContainer
        handleClick={setTab as any}
        tabs={[
          {
            id: "home",
            icon: <AiOutlineHome size={30} />,
          },
          {
            id: "power",
            icon: <GiCrossedSwords size={30} />,
            disabled: round.stage === "lobby",
          },
          {
            id: "character",
            icon: <RiCharacterRecognitionLine size={30} />,
          },
          {
            id: "alives",
            icon: <BsPeople size={30} />,
          },
        ]}
      >
        {tab === "home" && <Home stage={round.stage} winners={round.winners} />}
        {tab === "power" && <Vote alives={round.alives} />}
        {tab === "character" && <Character type={type} />}
        {tab === "alives" && <Alives alives={round.alives} />}
      </TabContainer>
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const roundId = (ctx as any).params.roundId;
  return { props: { roundId } };
};

export default Round;
