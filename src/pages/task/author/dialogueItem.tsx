import { BoldText } from "@/styles/text";
import styled from "styled-components";
import { UtteranceItem } from "./utils";
import { colors } from "@/styles/colors";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { updateUtterance } from "@/states/dataSlice";
import { useEffect, useState } from "react";
import { IconContext } from "react-icons";

interface DialogueItemProps extends UtteranceItem {
  isDragging: boolean;
}

const DialogueItem = (props: DialogueItemProps) => {
  const { id, speaker, utterance } = props;

  const [focus, setFocus] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setUtteranceContainerHeight();
    }, 1);
  }, []);

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
      focus={focus}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      <DialogueSpeakerWrapper>
        <IconContext.Provider
          value={{ color: colors["gray200"], style: { width: "15px" } }}
        >
          <RxDragHandleDots2 />
        </IconContext.Provider>
        <BoldText text={speaker} color="gray300" size={14} />
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
  border: 1px solid
    ${(props) => colors[props.isDragging ? "green200" : "gray100"]};
  border-radius: 5px;
  padding: 10px 12px;
  ${(props) => props.focus && `background-color: ${colors["green100"]};`}

  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const DialogueSpeakerWrapper = styled.div`
  width: 80px;
  height: fit-content;

  margin-top: 2px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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

  background-color: none;
  color: ${colors["gray400"]};

  font-size: 15px;
  line-height: 1.6;
`;
