import { updateDialogue } from "@/states/dataSlice";
import { colors } from "@/styles/colors";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { dialogueSample } from "../author/utils";

const DialogueCard = () => {
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(updateDialogue([...dialogueSample]));
  };

  return <DialogueCardWrapper onClick={onClick}></DialogueCardWrapper>;
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
`;
