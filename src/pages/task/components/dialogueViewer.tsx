import { RootState } from "@/states/state";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BoldText } from "@/styles/text";
import { getSpeakerName } from "../utils";
import { UtteranceItem } from "@/states/types";
import { colors } from "@/styles/colors";

const DialogueViewer = () => {
  const dialogue = useSelector((state: RootState) => state.data.dialogue);

  return (
    <DialogueViewerWrapper>
      {dialogue.map((item) => (
        <DialogueViewItem key={item.id} {...item} />
      ))}
    </DialogueViewerWrapper>
  );
};
export default DialogueViewer;

const DialogueViewerWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;

  gap: 16px;
`;

const DialogueViewItem = (props: UtteranceItem) => {
  return (
    <DialogueViewItemWrapper>
      <DialogueViewSpeaker>
        <BoldText
          text={getSpeakerName(props.speaker)}
          color="gray300"
          size={13}
        />
      </DialogueViewSpeaker>
      <DialogueViewUtterance>{props.utterance}</DialogueViewUtterance>
    </DialogueViewItemWrapper>
  );
};

const DialogueViewItemWrapper = styled.div`
  width: 100%;

  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const DialogueViewSpeaker = styled.div`
  justify-self: stretch;
  width: 80px;

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
