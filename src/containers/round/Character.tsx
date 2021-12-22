import React, { memo, useMemo } from "react";
import styled from "styled-components";
import { Header } from "../../components";

type CharacterType = "farmer" | "prophet" | "wolf" | "wolf-king" | "witch";

interface CharacterProps {
  type: CharacterType;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Icon = styled.div<{ url: string }>`
  width: 400px;
  height: 400px;

  background: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Content = styled.div`
  max-width: 780px;
  margin: auto;
`;

const Name = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary[600]};
`;

const Caption = styled.p`
  text-align: center;
  color: #999;
  max-width: 400px;
`;

const Character: React.FC<CharacterProps> = ({ type }) => {
  const name = useMemo(() => {
    switch (type) {
      case "wolf":
        return "狼人";
      case "wolf-king":
        return "狼王";
      case "farmer":
        return "農民";
      case "prophet":
        return "預言家";
      case "witch":
        return "女巫";
      default:
        return "";
    }
  }, [type]);

  const caption = useMemo(() => {
    switch (type) {
      case "wolf":
        return "和其他狼一起，你可以在晚上殺死村里的一個人。你也可以每天早上投票決定誰應該離開村莊。";
      case "wolf-king":
        return "和其他狼一起，你可以在晚上殺死村里的一個人。如果你早上被投票放逐，你可以立即殺死一個人。你也可以每天早上投票決定誰應該離開村莊。";
      case "farmer":
        return "你沒有任何超能力，但你可以每天早上投票決定誰應該離開村莊 ";
      case "prophet":
        return "每天晚上，你可以選擇一個村民，了解他/她是否是狼。你也可以每天早上投票決定誰應該離開村莊。";
      case "witch":
        return "你有一劑治療劑和一劑毒藥，你可以在晚上使用它們中的任何一種，也可以在一個晚上使用它們。你也可以每天早上投票決定誰應該離開村莊。";
      default:
        return "";
    }
  }, [type]);

  return (
    <Container>
      <Header>角色</Header>
      <Content>
        <Icon url={`/${type}.png`} />
        <Name>{name}</Name>
        <Caption>{caption}</Caption>
      </Content>
    </Container>
  );
};

export default memo(Character);
