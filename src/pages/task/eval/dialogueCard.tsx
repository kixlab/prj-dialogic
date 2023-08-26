import { updateDialogue } from "@/states/dataSlice";
import { colors } from "@/styles/colors";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dialogueSample } from "../author/utils";
import { BoldText, RegularText } from "@/styles/text";
import { level, strategy, summary } from "./modal/utils";

import StrategyTag from "./strategyTag";

const DialogueCard = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(updateDialogue([...dialogueSample]));
  };

  return (
    <DialogueCardWrapper onClick={onClick}>
      <CardTitleWrapper>
        <RegularText text="Dialogue 1" color="gray350" size={12} />
        <BoldText
          text="Alice explains photosynthesis herself"
          color="black"
          size={20}
        />
      </CardTitleWrapper>
      <CardSubtitleWrapper>
        <StrategyTag strategy={strategy} />
        <RegularText text={summary} color="gray350" size={14} />
      </CardSubtitleWrapper>
      <CardDivider />
      <CardLevelWrapper>
        {level.map((el) => (
          <CardLevelSummary key={el.title}>
            <RegularText text={el.title} color="gray300" size={13} />
            <BoldText
              text={"Level " + el.level.toString()}
              color="green300"
              size={12}
            />
          </CardLevelSummary>
        ))}
      </CardLevelWrapper>
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
