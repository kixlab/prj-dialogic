import { UtteranceItem } from "@/states/types";
import { transition } from "@/styles/animation";
import { colors } from "@/styles/colors";
import { BoldText } from "@/styles/text";
import styled from "styled-components";

const getSpeakerName = (speaker: number, ko: boolean) => {
  const tutor = ko ? "교사" : "Tutor";
  const tutee = ko ? "학생" : "Tutee";

  if (speaker == 0) return tutor;
  else return tutee + speaker;
};

interface CaptureItemProps extends UtteranceItem {
  ko: boolean;
}

const CaptureItem = (props: CaptureItemProps) => {
  return (
    <CaptureItemWrapper>
      <DialogueViewSpeaker>
        <BoldText
          text={getSpeakerName(props.speaker, props.ko)}
          color={"gray350"}
          size={13}
        />
      </DialogueViewSpeaker>
      <DialogueViewUtterance>
        <UtteranceMark highlight={false}>{props.utterance}</UtteranceMark>
      </DialogueViewUtterance>
    </CaptureItemWrapper>
  );
};
export default CaptureItem;

const CaptureItemWrapper = styled.div`
  width: 100%;

  position: relative;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const DialogueViewSpeaker = styled.div`
  justify-self: stretch;
  width: 70px;

  margin-top: 2px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const DialogueViewUtterance = styled.div`
  flex: 1;
  height: fit-content;

  background-color: transparent;
  color: ${colors["gray400"]};

  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;

const UtteranceMark = styled.mark<{ highlight: boolean }>`
  background-color: ${(props) =>
    props.highlight ? colors["aqua100"] : "transparent"};
  ${transition}
`;
