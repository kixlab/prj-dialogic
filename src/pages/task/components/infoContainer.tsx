import { text } from "@/states/constant";
import { LevelInfo } from "@/states/types";
import { colors } from "@/styles/colors";
import { BoldText, RegularText } from "@/styles/text";
import { ReactNode } from "react";
import styled from "styled-components";

export const LevelInfoContainer = (props: LevelInfo) => {
  return (
    <LevelInfoWrapper>
      <BoldText
        text={text.phase_2.task_2.card_2 + " " + props.level.toString()}
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

interface ModalInfoContainerProps {
  title: string;
  gap?: number;
  children: ReactNode;
}
export const ModalInfoContainer = (props: ModalInfoContainerProps) => {
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
