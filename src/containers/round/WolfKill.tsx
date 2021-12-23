import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { getFirebaseApp } from "../../utils";

interface WolfKillProps {
  alives: Array<string>;
  roundId: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const WolfKillItem = styled.button`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
  text-align: start;
  color: ${({ theme }) => theme.colors.primary[700]};
  background: transparent;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[50]};
  }
`;

const WolfKill: React.FC<WolfKillProps> = ({ alives, roundId }) => {
  const handleSelect = useCallback(async (name: string) => {
    // set who is being killed tonight
    getFirebaseApp();
    const db = getFirestore();
    await setDoc(
      doc(db, "rounds", roundId),
      { killing: name, stage: "witch" },
      { merge: true }
    );
  }, []);

  return (
    <Container>
      {alives.map((name, idx) => (
        <WolfKillItem
          key={`WolfKillItem-${name}-${idx}`}
          onClick={() => handleSelect(name)}
        >
          {name}
        </WolfKillItem>
      ))}
    </Container>
  );
};

export default memo(WolfKill);
