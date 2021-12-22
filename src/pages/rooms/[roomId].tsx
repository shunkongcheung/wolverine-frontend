import { doc, getDoc, getFirestore } from "firebase/firestore";
import type { GetServerSidePropsContext, NextPage } from "next";
import { AiOutlineLink } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { GiMagickTrick } from "react-icons/gi";
import { BsPeople } from "react-icons/bs";
import styled from "styled-components";

import { Control } from "../../containers/room";
import { TabContainer } from "../../components";
import { useRoom } from "../../hooks";
import { getFirebaseApp } from "../../utils";
import { useState } from "react";

interface RoomProps {
  roomId: string;

  // role count
  farmer: number;
  witch: number;
  wolf: number;
  wolfKing: number;

  // user's username who joined the room
  joined: Array<string>;

  // indicate a round started
  currentRound: string;

  // meta information
  createdBy: string;
}

type Tab = "trick" | "joined" | "control";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Room: NextPage<RoomProps> = (props) => {
  const { roomId, ...initialValues } = props;
  const room = useRoom(roomId, initialValues);
  const [tab, setTab] = useState<Tab>("control");

  return (
    <Container>
      <TabContainer
        handleClick={setTab as any}
        tabs={[
          {
            id: "joined",
            icon: <BsPeople size={30} />,
          },
          {
            id: "control",
            icon: <FaBars size={30} />,
          },
        ]}
      >
        <Control roomId={roomId} {...room} />
      </TabContainer>
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // fetch initial data
  const roomId = (ctx as any).params.roomId;
  getFirebaseApp();
  const db = getFirestore();
  const docRef = await getDoc(doc(db, "rooms", roomId));

  if (!docRef.exists()) {
    return { notFound: true };
  } else {
    const result = docRef.data();
    return { props: { ...result, roomId } };
  }
};

export default Room;
