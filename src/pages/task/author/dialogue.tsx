import { useState } from "react";
import TaskContainer from "../components/taskContainer";
import AuthorMode from "./authorMode";
import { Mode } from "./utils";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import DialogueAuthor from "./dialogueAuthor";

const Dialogue = () => {
  const [mode, setMode] = useState<Mode>("magic");

  return (
    <TaskContainer gap={10} padding={true} align="end">
      <AuthorMode mode={mode} setMode={setMode} />
      <DialogueWrapper>
        <DialogueAuthor mode={mode} />
        <DialogueDivider />
        <TextContainer mode={mode} />
      </DialogueWrapper>
    </TaskContainer>
  );
};

export default Dialogue;

const DialogueWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  display: flex;
  flex-direction: row;
`;
const DialogueDivider = styled.div`
  height: 100%;

  position: relative;
  left: 2px;
  border-left: 1px solid ${colors["gray200"]};
`;

const TextContainer = styled.div<{ mode: Mode }>`
  flex: ${(props) => (props.mode == "magic" ? 1 : 0.6)};
  height: fit-content;
`;
