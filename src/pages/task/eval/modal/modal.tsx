import { colors } from "@/styles/colors";

import styled from "styled-components";
import ModalSubBody from "./modalSubBody";

const DialogueModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <DialogueModalWrapper>
      <DialogueModalBodyWrapper></DialogueModalBodyWrapper>
      <DialogueModalDivider />
      <ModalSubBody onClick={onClose} />
    </DialogueModalWrapper>
  );
};
export default DialogueModal;

const DialogueModalWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  display: flex;
  flex-direction: row;
`;
const DialogueModalDivider = styled.div`
  height: 100%;

  position: relative;
  left: 2px;
  border-left: 1px solid ${colors["gray200"]};
`;

const DialogueModalBodyWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  padding: 25px 20px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
