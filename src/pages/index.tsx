import type { NextPage } from "next";
import Link from "next/link";
import styled from "styled-components";
import { Card } from "../components";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Row = styled.div`
  margin: 7px 0;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Card>
        <Content>
          <Row>
            <Link href="/rooms/create">
              <a>創建房間 >></a>
            </Link>
          </Row>
          <Row>
            <Link href="/rooms/join">
              <a>加入房間 >></a>
            </Link>
          </Row>
        </Content>
      </Card>
    </Container>
  );
};

export default Home;
