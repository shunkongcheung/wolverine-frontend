import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import type { GetServerSidePropsContext, NextPage } from "next";
import { FaBars } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
import styled from "styled-components";

import { Control, PeopleList } from "../../containers/room";
import { TabContainer } from "../../components";
import { useAuthed, useRoom } from "../../hooks";
import { getFirebaseApp } from "../../utils";
import { useEffect, useState } from "react";

interface RoomProps {
  roomId: string;
}

type Tab = "joined" | "control";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Room: NextPage<RoomProps> = (props) => {
  const { roomId } = props;
  const room = useRoom(roomId);
  const [tab, setTab] = useState<Tab>("control");

  // get username
  const username = useAuthed();

  // join room
  useEffect(() => {
    const run = async () => {
      getFirebaseApp();
      const db = getFirestore();
      await updateDoc(doc(db, "rooms", roomId), {
        joined: arrayUnion(username),
      });
    };

    if (!!username) run();
  }, [username]);

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
        {tab === "joined" ? (
          <PeopleList joined={room.joined} total={room.total} />
        ) : (
          <Control roomId={roomId} {...room} />
        )}
      </TabContainer>
    </Container>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // fetch initial data
  const roomId = (ctx as any).params.roomId;
  return { props: { roomId } };
};

export default Room;
