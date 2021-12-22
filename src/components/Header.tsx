import React, { memo } from "react";
import styled from "styled-components";

const Container = styled.h1`
  color: ${({ theme }) => theme.colors.primary[700]};
  text-align: center;
  margin: 0;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
`;

interface HeaderProps {
  children: string;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default memo(Header);
