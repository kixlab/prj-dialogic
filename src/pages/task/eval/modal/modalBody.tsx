import { BoldText, RegularText } from "@/styles/text";
import styled from "styled-components";
import DialogueViewer from "../../components/dialogueViewer";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";

const ModalBody = () => {
  const title = useSelector((state: RootState) => state.dialogue.title);
  const pattern = useSelector((state: RootState) => state.dialogue.pattern);
  const patternHover = useSelector(
    (state: RootState) => state.dialogue.patternHover
  );

  return (
    <ModalBodyWrapper>
      <ModalTitleWrapper>
        <RegularText text={"Selected Dialogue"} color="gray350" size={12} />
        <BoldText text={title} color="black" size={20} />
      </ModalTitleWrapper>
      <DialogueViewer
        highlight={
          patternHover !== null
            ? [pattern[patternHover].start, pattern[patternHover].end]
            : []
        }
      />
    </ModalBodyWrapper>
  );
};
export default ModalBody;

const ModalBodyWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  padding: 25px 28px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
const ModalTitleWrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;
`;
