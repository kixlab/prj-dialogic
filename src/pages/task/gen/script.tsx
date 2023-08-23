import { getScript } from "@/apis/openai";
import { RootState } from "@/states/state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Selection, addMarks, getSelections } from "./utils";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { doneTask, initTask } from "@/states/phaseSlice";
import { updateScript } from "@/states/dataSlice";

import { HiStar, HiDocumentText } from "react-icons/hi";
import { ModeButton, ModeButtonContainer } from "../components/modeButton";
import TaskContainer from "../components/taskContainer";

const Script = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const [selections, setSelections] = useState<Selection[]>([]);

  const dispatch = useDispatch();

  const video: string | null = useSelector(
    (state: RootState) => state.data.video
  );
  const script: string = useSelector((state: RootState) => state.data.script);

  useEffect(() => {
    if (!video) return;
    const asyncWrapper = async () => {
      const newScript = await getScript(video);
      if (!newScript) return;

      dispatch(updateScript(newScript));
    };
    asyncWrapper();
  }, []);

  const setEditContainerHeight = () => {
    const editContainer = document.getElementById(
      "editScript"
    ) as HTMLTextAreaElement;
    if (!editContainer) return;
    editContainer.style.height = editContainer.scrollHeight + "px";
  };

  const setHighlightContainerText = () => {
    const scriptWrapper = document.getElementById(
      "highlightScript"
    ) as HTMLElement;
    if (!scriptWrapper) return;
    scriptWrapper.innerHTML = addMarks(script, selections);
  };

  useEffect(() => {
    setEditContainerHeight();
  }, [script]);

  useEffect(() => {
    // update each container when mode is changed
    if (edit) setEditContainerHeight();
    else {
      setSelections([]); // init highlights
      setHighlightContainerText();
    }
  }, [edit]);

  useEffect(() => {
    // update highlight marks
    setHighlightContainerText();
    if (selections.length == 0) dispatch(initTask());
    else dispatch(doneTask());
  }, [selections]);

  const onMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectionString = selection.toString();
      if (selectionString == " " || selectionString == "") return;

      const start = script.indexOf(selectionString);
      const end = start + selectionString.length - 1;

      setSelections(getSelections([...selections, { start, end }]));
    }
  };

  const onEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateScript(e.target.value));
  };

  return (
    <TaskContainer gap={10} padding={true} align="start">
      <ModeButtonContainer>
        <ModeButton
          text="Edit"
          width="short"
          active={edit}
          onClick={() => setEdit(true)}
        >
          <HiDocumentText />
        </ModeButton>

        <ModeButton
          text="Highlight"
          width="long"
          active={!edit}
          onClick={() => {
            if (edit) setEdit(false);
            else setSelections([]);
          }}
        >
          <HiStar />
        </ModeButton>
      </ModeButtonContainer>
      {edit == true ? (
        <ScriptEditContainer id="editScript" value={script} onChange={onEdit} />
      ) : (
        <ScriptHighlightContainer id="highlightScript" onMouseUp={onMouseUp} />
      )}
    </TaskContainer>
  );
};
export default Script;

const ScriptEditContainer = styled.textarea`
  width: 100%;
  overflow: visible;

  border: none;
  resize: none;
  outline: none;

  box-sizing: border-box;
  padding: 12px 18px;
  background-color: ${colors["gray50"]};
  color: ${colors["gray400"]};
  border-radius: 5px;

  font-weight: medium;
  font-size: 15px;
  line-height: 1.6;
`;

const ScriptHighlightContainer = styled.div`
  width: 100%;

  box-sizing: border-box;
  padding: 12px 18px;
  background-color: ${colors["gray50"]};
  color: ${colors["gray400"]};
  border-radius: 5px;

  font-weight: medium;
  font-size: 15px;
  line-height: 1.6;
`;
