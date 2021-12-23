import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAuthed } from "../../hooks";
import { getFirebaseApp } from "../../utils";

interface VoteProps {
  alives: Array<string>;
  killing: string;
  poisoning: string;
  roundId: string;
  votes: Array<string>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const VoteItem = styled.button<{ disabled: boolean; selected: boolean }>`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
  border-top: 1px solid ${({ theme }) => theme.colors.primary[400]};
  text-align: start;
  color: ${({ theme }) => theme.colors.primary[700]};
  background: transparent;
  ${({ selected, theme }) =>
    selected && `background: ${theme.colors.primary[50]};`};

  ${({ disabled, theme }) =>
    disabled
      ? ""
      : `
      cursor: pointer;
  &:hover {
    background: ${theme.colors.primary[50]};
  }`}
`;

const VoteCountRow = styled.div`
  display: flex;
  margin-top: auto;
  align-items: end;
  padding: 20px;
`;

const VoteCountTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary[700]};
`;

const VoteCountValue = styled.h3`
  color: ${({ theme }) => theme.colors.primary[700]};
  margin: 0 0 0 auto;
`;

const SubHeading = styled.h2`
  color: ${({ theme }) => theme.colors.primary[700]};
`;

const Vote: React.FC<VoteProps> = ({
  alives,
  killing,
  poisoning,
  roundId,
  votes,
}) => {
  const [selected, setSelected] = useState("");

  const username = useAuthed();

  const iAmAlive = !!alives.find((itm) => itm === username);

  const heading = useMemo(() => {
    const dead = [killing, poisoning].filter((itm) => !!itm);
    if (!dead.length) return "今晚是平安夜";
    if (dead.length === 1) return `今晚${dead[0]}死了`;
    return `今晚${dead.join(", ")}死了`;
  }, [killing, poisoning]);

  const handleSelect = useCallback(
    async (name: string) => {
      setSelected(name);
      getFirebaseApp();
      const db = getFirestore();

      // submit result
      await setDoc(
        doc(db, "rounds", roundId),
        { votes: arrayUnion(`${name}-${username}`) },
        { merge: true }
      );
    },
    [setSelected, roundId, username]
  );

  useEffect(() => {
    getFirebaseApp();
    const db = getFirestore();
    onSnapshot(doc(db, "rounds", roundId), (docRef) => {
      const { votes, alives } = docRef.data() as any;
      if (votes.length === alives.length)
        setDoc(
          doc(db, "rounds", roundId),
          { stage: "discuss" },
          { merge: true }
        );
    });
  }, []);

  return (
    <Container>
      <SubHeading>{heading}</SubHeading>
      {alives.map((name, idx) => (
        <VoteItem
          disabled={!!selected || !iAmAlive}
          key={`VoteItem-${name}-${idx}`}
          onClick={selected ? undefined : () => handleSelect(name)}
          selected={selected === name}
        >
          {name}
        </VoteItem>
      ))}
      <VoteItem
        disabled={!!selected || !iAmAlive}
        onClick={selected ? undefined : () => handleSelect("giveup")}
        selected={selected === "giveup"}
      >
        棄權
      </VoteItem>
      <VoteCountRow>
        <VoteCountTitle>投票數</VoteCountTitle>
        <VoteCountValue>
          {votes.length}/{alives.length}
        </VoteCountValue>
      </VoteCountRow>
    </Container>
  );
};

export default memo(Vote);
