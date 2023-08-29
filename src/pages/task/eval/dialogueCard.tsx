import {
  updateDialogue,
  updateLevel,
  updatePattern,
  updateSpeaker,
  updateStrategy,
  updateSummary,
  updateTitle,
  updateScenario,
} from "@/states/dialogueSlice";
import { colors } from "@/styles/colors";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BoldText, RegularText } from "@/styles/text";
import { levelToState, uttrToState } from "./modal/utils";

import StrategyTag from "./strategyTag";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { text } from "@/states/constant";

interface DialogueCardProps {
  idx: number;
  strategy: string[];
  summary: string;
  patterns: number[][];
  scenario: string;
  level: string[][];
  dialogue: string[][];
}

const DialogueCard = (props: DialogueCardProps) => {
  const dispatch = useDispatch();
  const title = text.phase_2.task_1.card_1 + " " + props.idx;
  const base = useSelector((state: RootState) => state.phase.base);

  const onClick = () => {
    const { pattern, speaker, dialogue } = uttrToState(
      props.dialogue,
      props.patterns
    );
    dispatch(updateTitle(title));
    dispatch(updateSummary(props.summary));
    dispatch(updateStrategy(props.strategy));
    dispatch(updatePattern(pattern));
    dispatch(updateSpeaker(speaker));
    dispatch(updateLevel(levelToState(props.level)));
    dispatch(updateScenario(props.scenario));
    dispatch(updateDialogue(dialogue));
  };

  return (
    <DialogueCardWrapper onClick={onClick}>
      <CardTitleWrapper>
        {/* <RegularText text="Dialogue 1" color="gray350" size={12} /> */}
        <BoldText text={title} color="black" size={20} />
      </CardTitleWrapper>
      {!base && (
        <CardSubtitleWrapper>
          <StrategyTag strategy={props.strategy} />
          <RegularText text={props.summary} color="gray350" size={14} />
        </CardSubtitleWrapper>
      )}

      <CardDivider />
      {!base && (
        <CardLevelWrapper>
          {props.level.map((el) => (
            <CardLevelSummary key={el[0].split(":")[1]}>
              <RegularText
                text={el[0].split(":")[1]}
                color="gray300"
                size={13}
              />
              <BoldText
                text={"Level " + el[1].split(":")[1]}
                color="green300"
                size={12}
              />
            </CardLevelSummary>
          ))}
        </CardLevelWrapper>
      )}
    </DialogueCardWrapper>
  );
};
export default DialogueCard;

const DialogueCardWrapper = styled.div`
  flex: 1;

  height: fit-content;

  box-sizing: border-box;
  padding: 23px 25px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  &:hover {
    border: 1px solid ${colors["green200"]};
    box-shadow: 0px 0px 0px 4px rgba(233, 254, 240, 0.8);
  }
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardTitleWrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 2px;
`;
const CardSubtitleWrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 10px;
`;

const CardDivider = styled.div`
  width: 100%;

  position: relative;
  top: 1px;
  border-top: 1px solid ${colors["gray200"]};
`;

const CardLevelWrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 3px;
`;

const CardLevelSummary = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
