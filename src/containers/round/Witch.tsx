import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { memo } from "react";
import styled from "styled-components";

import { Button } from "../../components";
import { getFirebaseApp } from "../../utils";

interface WitchProps {
  alives: Array<string>;
  isHealed: boolean;
  isPoisoned: boolean;
  killing: string;
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

const Caption = styled.caption`
  color: ${({ theme }) => theme.colors.primary[800]};
  text-align: start;
  margin-bottom: 10px;
`;

const HealRow = styled.div`
  display: flex;
`;

const HealCheckBox = styled.input``;

const HealLabel = styled.label`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const Splitter = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.primary[500]};
  margin: 30px 0;
`;

const PoisionItem = styled.button<{ disabled?: boolean; selected?: boolean }>`
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary[400]};
  text-align: start;
  color: ${({ theme }) => theme.colors.primary[700]};

  background: transparent;
  ${({ disabled }) => disabled && "background: #efefef;"};
  ${({ selected, theme }) =>
    selected && `background: ${theme.colors.primary[50]};`};

  ${({ disabled, theme }) =>
    !disabled &&
    `
    cursor: pointer;
    &:hover {
      background: ${theme.colors.primary[50]};
    }
    `}
`;

const SubHeading = styled.h2`
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const Witch: React.FC<WitchProps> = ({
  alives,
  isHealed,
  isPoisoned,
  killing,
  roundId,
}) => {
  const formik = useFormik({
    initialValues: {
      isHealing: false,
      poisoning: "",
    },
    onSubmit: async ({ isHealing, poisoning }) => {
      getFirebaseApp();
      const db = getFirestore();
      const values: any = { poisoning, stage: "prophet" };
      if (isHealing) values.killing = "";
      await setDoc(doc(db, "rounds", roundId), values, { merge: true });
    },
  });

  return (
    <Container>
      <SubHeading>你想救援 {killing}嗎 </SubHeading>
      {isHealed && <Caption>你沒有任何劑量了 </Caption>}
      <HealRow>
        <HealCheckBox
          type="checkbox"
          disabled={isHealed}
          onChange={() =>
            formik.setFieldValue("isHealing", !formik.values.isHealing)
          }
        />
        <HealLabel>救援</HealLabel>
      </HealRow>
      <Splitter />

      <SubHeading>你想毒害任何人嗎 </SubHeading>
      {isPoisoned && <Caption>你沒有任何劑量了 </Caption>}
      {alives.map((name, idx) => (
        <PoisionItem
          key={`PoisonItem-${name}-${idx}`}
          onClick={() => formik.setFieldValue("poisoning", name)}
          disabled={isPoisoned}
          selected={formik.values.poisoning === name}
        >
          {name}
        </PoisionItem>
      ))}
      <BtnContainer>
        <Button handleClick={formik.handleSubmit}>結束</Button>
      </BtnContainer>
    </Container>
  );
};

export default memo(Witch);
