import { BoldText, RegularText } from "@/styles/text";
import { ReactNode } from "react";
import styled from "styled-components";
import Tag, { TagWrapper } from "../../components/tag";
import { colors } from "@/styles/colors";

import { summary, strategy, pattern, level, LevelInfoProps } from "./utils";
import StrategyTag from "../strategyTag";

const ModalSubBodyInfo = () => {
  return (
    <ModalSubBodyInfoWrapper>
      <ModalInfoContainer title="Dialogue Summary" gap={6}>
        <RegularText text={summary} color="gray350" size={14} />
      </ModalInfoContainer>
      <ModalInfoContainer title="Learning Strategy">
        <StrategyTag strategy={strategy} />
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
  padding: 0px 25px 30px 25px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;
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

const InfoTagWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const LevelInfo = (props: LevelInfoProps) => {
  return (
    <LevelInfoWrapper>
      <BoldText
        text={"Level " + props.level.toString()}
        color="green300"
        size={12}
      />
      <RegularText text={props.title} color="gray400" size={13} />
      <RegularText text={props.subtitle} color="gray350" size={13} />
    </LevelInfoWrapper>
  );
};

const LevelInfoWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  gap: 4px;
`;
