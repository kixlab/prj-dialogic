import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { IconContext } from "react-icons";
import { RxDragHandleDots2 } from "react-icons/rx";

import { updateUtterance } from "@/states/dataSlice";
import { updateFocus } from "@/states/authorSlice";
import { RootState } from "@/states/state";

import { BoldText } from "@/styles/text";
import { colors } from "@/styles/colors";
import { getSpeakerName } from "../utils";
import { UtteranceItem } from "@/states/types";

interface DialogueItemProps extends UtteranceItem {
  isDragging: boolean;
  width: number;
}

const DialogueItem = (props: DialogueItemProps) => {
  const { id, speaker, utterance } = props;

  const focus: string | null = useSelector(
    (state: RootState) => state.author.focus
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setUtteranceContainerHeight();
    }, 1);
  }, [props.width]);

  const onFocus = () => {
    dispatch(updateFocus(id));
  };

  const setUtteranceContainerHeight = () => {
    const utteranceContainer = document.getElementById(
      "utterance" + id
    ) as HTMLTextAreaElement;
    if (!utteranceContainer) return;
    utteranceContainer.style.height = "0px";
    utteranceContainer.style.height = utteranceContainer.scrollHeight + "px";
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateUtterance({ id, speaker, utterance: e.target.value }));
    setUtteranceContainerHeight();
  };

  return (
    <DialogueItemWrapper
      isDragging={props.isDragging}
      focus={focus === id}
      onFocus={onFocus}
    >
      <DialogueSpeakerWrapper>
        <IconContext.Provider
          value={{
            color: colors["gray200"],
            style: { width: "15px", alignSelf: "center" },
          }}
        >
          <RxDragHandleDots2 />
        </IconContext.Provider>
        <BoldText text={getSpeakerName(speaker)} color="gray300" size={13} />
      </DialogueSpeakerWrapper>
      <DialogueUtterance
        rows={1}
        id={"utterance" + id}
        value={utterance}
        onChange={onChange}
        spellCheck={false}
      />
    </DialogueItemWrapper>
  );
};
export default DialogueItem;

const DialogueItemWrapper = styled.div<{ isDragging: boolean; focus: boolean }>`
  width: 100%;

  box-sizing: border-box;
  border: 1px solid ${colors["gray100"]};
  ${(props) => props.focus && `border: 1px solid ${colors["green200"]};`}
  ${(props) => props.isDragging && `border: 1px solid ${colors["gray200"]};`}

  border-radius: 5px;
  padding: 10px 12px 10px 10px;
  ${(props) =>
    props.focus && `box-shadow: 0px 0px 0px 4px rgba(233, 254, 240, 0.8);`}

  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const DialogueSpeakerWrapper = styled.div`
  justify-self: stretch;
  width: 80px;

  margin-top: 2px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
`;

const DialogueUtterance = styled.textarea`
  width: 100%;
  overflow: hidden;

  border: none;
  outline: none;
  resize: none;
  padding: 0px;
  margin: 0px;

  background-color: transparent;
  color: ${colors["gray400"]};

  font-size: 15px;
  font-weight: 400;
  line-height: 1.5;
`;
