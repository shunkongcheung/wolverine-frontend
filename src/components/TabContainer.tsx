import React, { memo, ReactNode } from "react";
import styled from "styled-components";

interface TabContainerProps {
  children: ReactNode;
  handleClick: (id: string) => any;
  tabs: Array<{
    id: string;
    icon: ReactNode;
    disabled?: boolean;
  }>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
`;

const TabBtnContainer = styled.div`
  display: flex;
  width: 100%;
`;

const TabBtn = styled.div<{ disabled: boolean }>`
  border-radius: 0;
  color: ${({ theme }) => theme.colors.primary[600]};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.primary[200]};
  width: 100%;
  padding: 20px;

  ${({ disabled, theme }: any) =>
    !disabled &&
    `
  &:hover {
    color: ${theme.colors.primary[700]};
    border-color: ${theme.colors.primary[400]};
    cursor: pointer;
  }`}

  ${({ disabled }: any) => !!disabled && `color: #ccc; border-color: #ccc;`}
`;

const TabContainer: React.FC<TabContainerProps> = ({
  children,
  handleClick,
  tabs,
}) => {
  return (
    <Container>
      <Content>{children}</Content>
      <TabBtnContainer>
        {tabs.map(({ disabled, id, icon }) => (
          <TabBtn
            disabled={disabled || false}
            key={`TabBtn-${id}`}
            onClick={disabled ? undefined : () => handleClick(id)}
          >
            {icon}
          </TabBtn>
        ))}
      </TabBtnContainer>
    </Container>
  );
};

export default memo(TabContainer);
