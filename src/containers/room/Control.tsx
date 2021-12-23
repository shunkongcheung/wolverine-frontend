import React, { memo, useCallback } from "react";
import styled from "styled-components";
import QRCode from "react-qr-code";

import { Button, Header } from "../../components";
import { getFirebaseApp } from "../../utils";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";

interface ControlProps {
  roomId: string;
  joined: Array<string>;
  wolf: number;
  wolfKing: number;
  witch: number;
  farmer: number;
  total: number;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  width: 256px;
  height: 100%;

  margin: auto;
`;

const RoomId = styled.div`
  margin-top: 20px;
`;

const HOST_NAME =
  "https://wolverine-frontend-1gwn2veho-shunkongcheung.vercel.app";

const getResult = (joined: Array<string>, count: number) => {
  // note that this function modified input joined
  // when joined is being sliced, the content is removed from array
  let result: Array<string> = [];
  for (let idx = 0; idx < count; idx++) {
    const randId = Math.floor(Math.random() * joined.length);
    result = result.concat(joined.splice(randId, 1));
  }

  return result;
};

const Control: React.FC<ControlProps> = ({
  joined,
  roomId,
  wolf,
  wolfKing,
  witch,
  farmer,
  total,
}) => {
  const router = useRouter();

  const isFull = joined.length === total;

  const handleClick = useCallback(async () => {
    getFirebaseApp();
    const db = getFirestore();

    const duplicated = JSON.parse(JSON.stringify(joined));

    const timestamp = new Date();
    const round = {
      roomId,
      timestamp,
      stage: "lobby",
      winners: "",
      wolfs: getResult(duplicated, wolf),
      wolfKings: getResult(duplicated, wolfKing),
      prophets: getResult(duplicated, 1),
      farmers: getResult(duplicated, farmer),
      witches: getResult(duplicated, witch),
      alives: joined,
      votes: [],
      killing: "",
      poisoning: "",
      isHealed: false,
      isPoisoned: false,
    };

    const docRef = await addDoc(collection(db, "rounds"), round);

    // update rooms' current id
    await setDoc(
      doc(db, "rooms", roomId),
      { currentRound: docRef.id },
      { merge: true }
    );

    // redirect to round page
    router.push(`/rounds/${docRef.id}`);
  }, [joined, roomId, wolf, wolfKing, witch, farmer, total]);
  return (
    <Container>
      <Header>設置</Header>
      <Content>
        <QRCode value={`${HOST_NAME}/rooms/${roomId}`} />
        <RoomId>{roomId}</RoomId>
        <Button disabled={!isFull} handleClick={handleClick}>
          開始
        </Button>
      </Content>
    </Container>
  );
};

export default memo(Control);
