import { doc, getFirestore, setDoc } from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useCallback, useState } from "react";
import styled from "styled-components";
import { getFirebaseApp } from "../utils";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  border-radius: 5px;
  width: 500px;
  height: 700px;
  max-width: 70%;
  max-height: 60vh;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  height: 100%;
`;

const IconContainer = styled.div`
  width: 100%;
  background: #1b304f;
  display: flex;
  justify-content: center;

  padding: 50px 0;
`;

const Icon = styled.div`
  background: url(/main-icon.jpg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 200px;
  height: 150px;
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

const SubmitBtn = styled.button`
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
  width: 90%;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const Register: NextPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const submit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      // prevent redirect
      evt.preventDefault();

      // check if username is empty
      if (!username) return;

      // getting firebase
      getFirebaseApp();
      const db = getFirestore();

      // submit value to firebase
      const timestamp = new Date();
      await setDoc(doc(db, "users", username), { username, timestamp });

      // store username to local storage
      localStorage.setItem("username", username);

      // redirect to home page
      router.push("/");
    },
    [username, router]
  );

  return (
    <Container>
      <Card>
        <IconContainer>
          <Icon />
        </IconContainer>
        <form onSubmit={submit}>
          <Content>
            <Row>
              <Title>display name</Title>
              <Input
                name="username"
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </Row>
            <Row>
              <SubmitBtn type="submit">SUBMIT</SubmitBtn>
            </Row>
          </Content>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
