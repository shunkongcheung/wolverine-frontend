import { doc, getDoc, getFirestore } from "firebase/firestore";
import type { GetServerSidePropsContext, NextPage } from "next";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GiCrossedSwords } from "react-icons/gi";
import { RiCharacterRecognitionLine } from "react-icons/ri";
import styled from "styled-components";

import { TabContainer } from "../../components";
import { Character } from "../../containers/round";
import { getFirebaseApp } from "../../utils";

interface RoundProps {
  roundId: string;

  // meta information
  roomId: string;
  winners: string;

  // roles
  farmers: Array<string>;
  prophets: Array<string>;
  witches: Array<string>;
  wolfKings: Array<string>;
  wolfs: Array<string>;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Round: NextPage<RoundProps> = (props) => {
  const [tab, setTab] = useState("control");
  return (
    <Container>
      <TabContainer
        handleClick={setTab as any}
        tabs={[
          {
            id: "character",
            icon: <GiCrossedSwords size={30} />,
          },
          {
            id: "character",
            icon: <RiCharacterRecognitionLine size={30} />,
          },
          {
            id: "control",
            icon: <FaBars size={30} />,
          },
        ]}
      >
        <Character type="wolf" />
      </TabContainer>
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // fetch initial data
  const roundId = (ctx as any).params.roundId;
  getFirebaseApp();
  const db = getFirestore();
  const docRef = await getDoc(doc(db, "rounds", roundId));

  if (!docRef.exists()) {
    return { notFound: true };
  } else {
    const { timestamp, ...result } = docRef.data();
    return { props: { ...result, roundId } };
  }
};

export default Round;
