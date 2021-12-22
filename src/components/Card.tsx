import React, { ReactNode, memo } from "react";
import styled from "styled-components";

interface CardProps {
  children: ReactNode;
}

const Container = styled.div`
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

const ContentContainer = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 90%;
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

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Container>
      <IconContainer>
        <Icon />
      </IconContainer>
      <ContentContainer>
        <Content>{children}</Content>
      </ContentContainer>
    </Container>
  );
};

export default memo(Card);
