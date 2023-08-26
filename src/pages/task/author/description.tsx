import styled from "styled-components";
import { RegularText } from "@/styles/text";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import StrategyTag from "../eval/strategyTag";
import {
  ModalInfoContainer,
  LevelInfoContainer,
} from "../components/infoContainer";

const Description = () => {
  const dialogue = useSelector((state: RootState) => state.dialogue);

  return (
    <DescriptionWrapper>
      <ModalInfoContainer title="Dialogue Summary" gap={6}>
        <RegularText text={dialogue.summary} color="gray350" size={14} />
      </ModalInfoContainer>
      <ModalInfoContainer title="Learning Strategy">
        <StrategyTag strategy={dialogue.strategy} />
      </ModalInfoContainer>
      <ModalInfoContainer title="Knowledge Level">
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
