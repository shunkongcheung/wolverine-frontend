import React, { memo, useState } from "react";
import styled from "styled-components";

import { Header } from "../../components";

interface AlivesProps {
  alives: Array<string>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const AlivesItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
  color: ${({ theme }) => theme.colors.primary[700]};
`;

const Alives: React.FC<AlivesProps> = ({ alives }) => {
  return (
    <Container>
      <Header>村里的人</Header>
      <Content>
        {alives.map((name, idx) => (
          <AlivesItem key={`AlivesItem-${name}-${idx}`}>{name}</AlivesItem>
        ))}
      </Content>
    </Container>
  );
};

export default memo(Alives);
