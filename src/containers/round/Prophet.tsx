import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import { Button } from "../../components";
import { getFirebaseApp } from "../../utils";

interface ProphetProps {
  alives: Array<string>;
  killing: string;
  poisoning: string;
  wolfs: Array<string>;
  roundId: string;
}

const BtnContainer = styled.div`
  padding-top: 50px;
  padding-bottom: 20px;
  margin-top: auto;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const AliveItem = styled.button<{ selected?: boolean }>`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
  text-align: start;
  color: ${({ theme }) => theme.colors.primary[700]};

  background: transparent;
  ${({ selected, theme }) =>
    selected && `background: ${theme.colors.primary[50]};`};

  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const SubHeading = styled.h2`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const Prophet: React.FC<ProphetProps> = ({
  alives,
  killing,
  poisoning,
  wolfs,
  roundId,
}) => {
  const [selected, setSelected] = useState("");

  const remains = useMemo(
    () => alives.filter((itm) => itm !== killing && itm !== poisoning),
    [alives, killing, poisoning]
  );

  const handleFinish = useCallback(async () => {
    getFirebaseApp();
    const db = getFirestore();

    await setDoc(
      doc(db, "rounds", roundId),
      { stage: "vote", alives: remains },
      { merge: true }
    );
  }, [remains]);

  const heading = useMemo(() => {
    if (!selected) return "你想調查誰";

    const isWolf = wolfs.find((itm) => itm === selected);
    return `${selected}${isWolf ? "" : "不"}是狼`;
  }, [selected, wolfs]);

  return (
    <Container>
      <SubHeading>{heading}</SubHeading>
      {alives.map((name, idx) => (
        <AliveItem
          key={`AliveItem-${name}-${idx}`}
          onClick={() => setSelected((o) => o || name)}
          selected={selected === name}
        >
          {name}
        </AliveItem>
      ))}
      <BtnContainer>
        <Button handleClick={handleFinish}>結束</Button>
      </BtnContainer>
    </Container>
  );
};

export default memo(Prophet);
