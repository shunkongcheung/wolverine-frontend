import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useFormik } from "formik";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import styled from "styled-components";
import * as yup from "yup";
import { useAuthed } from "../../hooks";
import { getFirebaseApp } from "../../utils";

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 780px;
  margin: auto;
`;

const Header = styled.h1`
  color: ${({ theme }) => theme.colors.primary[700]};
  text-align: center;
  margin: 0;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
`;

const Row = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[200]};
  padding: 20px;
`;

const Icon = styled.div<{ url: string }>`
  width: 80px;
  height: 80px;
  background: url(${(props: { url: string }) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 20px;
`;

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const Input = styled.input`
  margin-left: auto;
  width: 80px;
  font-size: 20px;
`;

const TotalTitle = styled.h3`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const TotalValue = styled.h2`
  width: 80px;
  text-align: end;
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const RoomCreate: NextPage = () => {
  const username = useAuthed();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      farmer: 2,
      witch: 1,
      wolf: 1,
      wolfKing: 0,
    },
    onSubmit: async (values) => {
      // get firebase instance
      getFirebaseApp();
      const db = getFirestore();

      // submit document
      const docRef = await addDoc(collection(db, "rooms"), {
        ...values,
        currentRound: "", // id that points to rounds
        createdBy: username,
        joined: [username], // list of person who joinned the room
      });

      // redirect to room page
      router.push(`/rooms/${docRef.id}`);
    },
    validationSchema: yup.object({
      farmer: yup.number().min(2).max(5).required(),
      witch: yup.number().min(0).max(1).required(),
      wolf: yup.number().min(0).max(3).required(),
      wolfKing: yup.number().min(0).max(1).required(),
    }),
  });

  const sum = useMemo(() => {
    const prophetCount = 1;
    return (
      Object.values(formik.values).reduce((acc, curr) => acc + curr, 0) +
      prophetCount
    );
  }, [formik.values]);

  return (
    <Container>
      <Header>創建房間</Header>
      <Row>
        <Content>
          <Icon url="/wolf.png" />
          <Name>狼人</Name>
          <Input
            type="number"
            min={0}
            max={3}
            value={formik.values.wolf}
            name="wolf"
            onChange={formik.handleChange}
          />
        </Content>
      </Row>
      <Row>
        <Content>
          <Icon url="/wolf-king.png" />
          <Name>狼王</Name>
          <Input
            type="number"
            min={0}
            max={1}
            value={formik.values.wolfKing}
            name="wolfKing"
            onChange={formik.handleChange}
          />
        </Content>
      </Row>
      <Row>
        <Content>
          <Icon url="/farmer.png" />
          <Name>農民</Name>
          <Input
            type="number"
            min={2}
            max={5}
            value={formik.values.farmer}
            name="farmer"
            onChange={formik.handleChange}
          />
        </Content>
      </Row>
      <Row>
        <Content>
          <Icon url="/prophet.png" />
          <Name>預言家</Name>
          <Input type="number" defaultValue={1} disabled />
        </Content>
      </Row>
      <Row>
        <Content>
          <Icon url="/witch.png" />
          <Name>女巫</Name>
          <Input
            type="number"
            min={0}
            max={1}
            value={formik.values.witch}
            name="witch"
            onChange={formik.handleChange}
          />
        </Content>
      </Row>
      <Row>
        <Content>
          <TotalTitle>合計</TotalTitle>
          <TotalValue>{sum}</TotalValue>
        </Content>
        <Content>
          <button type="button" onClick={formik.handleSubmit as any}>
            完成
          </button>
        </Content>
      </Row>
    </Container>
  );
};

export default RoomCreate;
