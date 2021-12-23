import type { NextPage } from "next";
import { useRouter } from "next/router";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { FormEvent, useCallback, useState } from "react";
import styled from "styled-components";

import { Button, Card } from "../../components";
import { getFirebaseApp } from "../../utils";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.primary[700]};
  border-radius: 2px;
  padding: 5px 2px;
  color: ${({ theme }) => theme.colors.primary[500]};

  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 70%;
  }
`;

const SubmitBtnContainer = styled.div`
  margin-left: auto;

  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 70%;
  }
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.primary[800]};
  font-weight: 700;
  font-size: 16px;

  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 30%;
  }

  padding-bottom: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding-bottom: 0;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const RoomJoin: NextPage = () => {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const submit = useCallback(async () => {
    // check if username is empty
    if (!roomId) return;

    // redirect to home page
    router.push(`/rooms/${roomId}`);
  }, [roomId, router]);

  return (
    <Container>
      <Card>
        <Form>
          <Row>
            <Title>輸入房間編號 </Title>
            <Input
              name="roomId"
              type="text"
              value={roomId}
              onChange={({ target }) => setRoomId(target.value)}
            />
          </Row>
          <Row>
            <SubmitBtnContainer>
              <Button handleClick={submit}>提交</Button>
            </SubmitBtnContainer>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default RoomJoin;
