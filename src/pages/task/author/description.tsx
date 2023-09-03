import styled from "styled-components";
import { RegularText } from "@/styles/text";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import StrategyTag from "../eval/strategyTag";
import {
  ModalInfoContainer,
  LevelInfoContainer,
} from "../components/infoContainer";
import { text } from "@/states/constant";

const Description = () => {
  const dialogue = useSelector((state: RootState) => state.dialogue);

  return (
    <DescriptionWrapper>
      <ModalInfoContainer title={text.phase_2.task_2.modal_1} gap={6}>
        <RegularText text={dialogue.summary} color="gray350" size={14} />
      </ModalInfoContainer>
      <ModalInfoContainer title={text.phase_2.task_2.modal_2}>
        <StrategyTag strategy={dialogue.strategy} />
      </ModalInfoContainer>
      <ModalInfoContainer title={text.phase_2.task_2.modal_4}>
        {dialogue.level.map((lev) => (
          <LevelInfoContainer {...lev} />
        ))}
      </ModalInfoContainer>
    </DescriptionWrapper>
  );
};
export default Description;

const DescriptionWrapper = styled.div`
  flex: 0.6;
  height: fit-content;

  box-sizing: border-box;
  padding: 30px 25px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;
