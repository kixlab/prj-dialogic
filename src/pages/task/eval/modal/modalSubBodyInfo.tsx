import { RegularText } from "@/styles/text";
import styled from "styled-components";
import Tag, { TagWrapper } from "../../components/tag";

import StrategyTag from "../strategyTag";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { useDispatch } from "react-redux";
import { updatePatternHover } from "@/states/dialogueSlice";
import {
  ModalInfoContainer,
  LevelInfoContainer,
} from "../../components/infoContainer";

const ModalSubBodyInfo = () => {
  const dialogue = useSelector((state: RootState) => state.dialogue);
  const dispatch = useDispatch();

  const onPatternHover = (idx: number) => {
    dispatch(updatePatternHover(idx));
  };
  const outPatternHover = () => {
    dispatch(updatePatternHover(null));
  };

  return (
    <ModalSubBodyInfoWrapper>
      <ModalInfoContainer title="Dialogue Summary" gap={6}>
        <RegularText text={dialogue.summary} color="gray350" size={14} />
      </ModalInfoContainer>
      <ModalInfoContainer title="Learning Strategy">
        <StrategyTag strategy={dialogue.strategy} />
      </ModalInfoContainer>
      <ModalInfoContainer title="Utterance Pattern">
        <InfoTagWrapper>
          {dialogue.pattern.map((el, idx) => (
            <TagWrapper
              onPointerEnter={() => onPatternHover(idx)}
              onPointerLeave={outPatternHover}
            >
              <Tag
                title={el.title}
                theme={idx === dialogue.patternHover ? "yellow" : "gray"}
              />
            </TagWrapper>
          ))}
        </InfoTagWrapper>
      </ModalInfoContainer>

      <ModalInfoContainer title="Knowledge Level">
        {dialogue.level.map((lev) => (
          <LevelInfoContainer {...lev} />
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

const InfoTagWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;
