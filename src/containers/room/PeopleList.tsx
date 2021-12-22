import React, { memo } from "react";
import styled from "styled-components";

import { Header } from "../../components";

interface PeopleListProps {
  joined: Array<string>;
  total: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 780px;
  margin: auto;
`;

const Row = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[200]};
  padding: 20px;
  display: flex;
  align-items: center;
`;

const Name = styled.h3`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const TotalTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const TotalValue = styled.h2`
  margin-left: auto;
  width: 80px;
  text-align: end;
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const PeopleList: React.FC<PeopleListProps> = ({ joined, total }) => {
  return (
    <Container>
      <Header>加入村民 </Header>
      <Row>
        <TotalTitle>人數 </TotalTitle>
        <TotalValue>
          {joined.length}/{total}
        </TotalValue>
      </Row>
      {joined.map((name) => (
        <Row key={`JoinedRow-${name}`}>
          <Content>{name}</Content>
        </Row>
      ))}
    </Container>
  );
};

export default memo(PeopleList);
