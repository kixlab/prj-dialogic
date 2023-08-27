import { useState } from "react";
import TaskContainer from "../components/taskContainer";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import DialogueAuthor from "./dialogueAuthor";
import AuthorTool from "./authorTool";
import { AuthorMode } from "@/states/types";
import AuthorModeSelector from "./authorModeSelector";
import Transcript from "./transcript";
import Description from "./description";
import Magic from "./magic";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";

const Dialogue = () => {
  const [mode, setMode] = useState<AuthorMode>("transcript");
  const base = useSelector((state: RootState) => state.phase.base);

  return (
    <TaskContainer gap={10} padding={true} align="end">
      <DialogueToolWrapper>
        <AuthorTool />
        {!base && <AuthorModeSelector mode={mode} setMode={setMode} />}
      </DialogueToolWrapper>
      <DialogueWrapper>
        <DialogueAuthor mode={mode} />
        <DialogueDivider />
        {mode == "transcript" && <Transcript />}
        {mode == "description" && <Description />}
        {mode == "magic" && <Magic />}
      </DialogueWrapper>
    </TaskContainer>
  );
};

export default Dialogue;

const DialogueToolWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

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
