import React, { memo, useState } from "react";
import styled from "styled-components";

import { Header } from "../../components";

interface VoteProps {
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

const GiveUpPadding = styled.div`
  height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
`;

const VoteItem = styled.div<{ disabled: boolean; selected: boolean }>`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};

  ${({ theme, selected }) =>
    `color: ${selected ? "white" : theme.colors.primary[700]};`}

  ${({ theme, selected }) =>
    `background: ${selected ? theme.colors.primary[700] : undefined};`}

   ${({ disabled }) => (disabled ? "" : "cursor: pointer;")}
`;

const Vote: React.FC<VoteProps> = ({ alives }) => {
  const [selected, setSelected] = useState("");
  return (
    <Container>
      <Header>表决</Header>
      <Content>
        <VoteItem
          disabled={!!selected}
          onClick={selected ? undefined : () => setSelected("giveup")}
          selected={selected === "giveup"}
        >
          棄權
        </VoteItem>
        <GiveUpPadding />

        {alives.map((name, idx) => (
          <VoteItem
            disabled={!!selected}
            key={`VoteItem-${name}-${idx}`}
            onClick={selected ? undefined : () => setSelected(name)}
            selected={selected === name}
          >
            {name}
          </VoteItem>
        ))}
      </Content>
    </Container>
  );
};

export default memo(Vote);
