import { BoldText, RegularText } from "@/styles/text";
import { ReactNode } from "react";
import styled from "styled-components";
import { getTagTheme } from "../../utils";
import Tag, { TagWrapper } from "../../components/tag";
import { colors } from "@/styles/colors";

const summary =
  "Alice confused about the order of the photosynthesis process. With tutor’s scaffolding, she could explain each step by herself";
const strategy: string[] = [
  "cognitive conflict",
  "cognitive prompting",
  "metacognitive prompting",

  "spontaneous deep-level reasoning question",
];

const pattern: string[] = ["tutor->tutee", "tutee->tutor", "tutor->tutor"];

const level: LevelInfoProps[] = [
  {
    title: "Calculating midpoint",
    level: 4,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
  {
    title: "Basic notion of binary searcht",
    level: 2,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
  {
    title: "Maximum calculation number of binary search",
    level: 1,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
  {
    title: "Understanding the depth of binary search tree",
    level: 3,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
];

const ModalSubBodyInfo = () => {
  return (
    <ModalSubBodyInfoWrapper>
      <ModalInfoContainer title="Dialogue Summary" gap={6}>
        <RegularText text={summary} color="gray350" size={14} />
      </ModalInfoContainer>
      <ModalInfoContainer title="Learning Strategy">
        <InfoTagWrapper>
          {strategy.map((title) => (
            <Tag title={title} theme={getTagTheme(title)} />
          ))}
        </InfoTagWrapper>
      </ModalInfoContainer>
      <ModalInfoContainer title="Utterance Pattern">
        <InfoTagWrapper>
          {pattern.map((title) => (
            <TagWrapper>
              <Tag title={title} theme={"gray"} />
            </TagWrapper>
          ))}
        </InfoTagWrapper>
      </ModalInfoContainer>

      <ModalInfoContainer title="Knowledge Level">
        {level.map((lev) => (
          <LevelInfo {...lev} />
        ))}
      </ModalInfoContainer>
    </ModalSubBodyInfoWrapper>
  );
};
export default ModalSubBodyInfo;

const ModalSubBodyInfoWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 0px 25px 40px 25px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
`;

const InfoTagWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

interface ModalInfoContainerProps {
  title: string;
  gap?: number;
  children: ReactNode;
}
const ModalInfoContainer = (props: ModalInfoContainerProps) => {
  return (
    <ModalInfoContainerWrapper gap={props.gap ?? 10}>
      <BoldText text={props.title} color="gray400" size={15} />
      {props.children}
    </ModalInfoContainerWrapper>
  );
};

const ModalInfoContainerWrapper = styled.div<{ gap: number }>`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${(props) => `${props.gap}px`};

  line-height: 1.3;
`;

interface LevelInfoProps {
  title: string;
  level: number;
  subtitle: string;
}

const LevelInfo = (props: LevelInfoProps) => {
  return (
    <LevelInfoWrapper>
      <RegularText text={props.title} color="gray400" size={14} />

      <RegularText text={props.subtitle} color="gray300" size={13} />
    </LevelInfoWrapper>
  );
};

const LevelInfoWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 5px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;
