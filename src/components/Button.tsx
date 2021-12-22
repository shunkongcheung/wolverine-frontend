import React, { ReactNode, memo, useState, useCallback } from "react";
import styled from "styled-components";
import { ImSpinner } from "react-icons/im";

const Container = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.primary[600]};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.primary[500]};
  background: white;
  padding: 6px;
  width: 100%;

  transition: background 0.5s;

  ${({ disabled, theme }: any) =>
    !disabled &&
    `
  &:hover,
  &:focus {
    cursor: pointer;
    color: white;
    border-color: ${theme.colors.primary[600]};
    background: ${theme.colors.primary[500]};
  }
  `}

  ${({ disabled }: any) => !!disabled && `color: #ccc; border-color: #ccc;`}
`;

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  handleClick: () => Promise<any> | any;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, handleClick }) => {
  const [loading, setLoading] = useState(false);

  const iHandleClick = useCallback(async () => {
    if (disabled) return;

    setLoading(true);
    await handleClick();
    setLoading(false);
  }, [disabled, handleClick, setLoading]);

  return (
    <Container disabled={disabled} onClick={iHandleClick}>
      {loading ? <ImSpinner /> : children}
    </Container>
  );
};

export default memo(Button);
