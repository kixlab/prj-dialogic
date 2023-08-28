import { getScript } from "@/apis/openai";
import { RootState } from "@/states/state";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addMarks, getSelections } from "./utils";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { doneTask, initTask, updateLoading } from "@/states/phaseSlice";
import {
  updateFullScript,
  updateRubric,
  updateScript,
  updateSelections,
} from "@/states/userDataSlice";

import { HiStar, HiDocumentText } from "react-icons/hi";
import { ModeButton, ModeButtonContainer } from "../components/modeButton";
import TaskContainer from "../components/taskContainer";
import { getRubric } from "@/apis/lab";
import Loading from "../components/loading";

const Script = () => {
  const [edit, setEdit] = useState<boolean>(true);
  const base = useSelector((state: RootState) => state.phase.base);
  const loading = useSelector((state: RootState) => state.phase.loading);

  const dispatch = useDispatch();

  const video: string | null = useSelector(
    (state: RootState) => state.data.video
  );
  const fullVideo: string | null = useSelector(
    (state: RootState) => state.data.fullVideo
  );
  const script: string | null = useSelector(
    (state: RootState) => state.userData.script
  );
  const fullScript: string | null = useSelector(
    (state: RootState) => state.userData.fullScript
  );
  const rubric: string | null = useSelector(
    (state: RootState) => state.userData.rubric
  );

  const selections = useSelector(
    (state: RootState) => state.userData.selections
  );

  useEffect(() => {
    if (!video || !fullVideo) return;
    const asyncWrapper = async () => {
      dispatch(updateLoading(true));
      let newScript = await getScript(video);
      if (!newScript) return;

      dispatch(updateScript(newScript));

      newScript = await getScript(fullVideo);
      if (!newScript) return;

      dispatch(updateFullScript(newScript));
      dispatch(updateLoading(false));
    };
    asyncWrapper();
  }, []);

  useEffect(() => {
    if (!loading) setEditContainerHeight();
  }, [loading]);

  useEffect(() => {
    const asyncWrapper = async () => {
      if (!script) return;
      const rubric = await getRubric(script);
      dispatch(updateRubric(rubric));
    };
    asyncWrapper();
  }, [script]);

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
    if (!scriptWrapper || !script) return;
    scriptWrapper.innerHTML = addMarks(script, selections);
    dispatch(updateSelections(selections));
  };

  useEffect(() => {
    // update each container when mode is changed
    if (edit) setEditContainerHeight();
    else {
      dispatch(updateSelections([])); // init highlights
      setHighlightContainerText();
    }
  }, [edit]);

  useEffect(() => {
    // update highlight marks
    setHighlightContainerText();
    if ((!base && selections.length == 0) || !fullScript || !rubric)
      dispatch(initTask());
    else dispatch(doneTask());
  }, [selections, fullScript, rubric]);

  const onMouseUp = () => {
    const selection = window.getSelection();
    if (selection && script) {
      const selectionString = selection.toString();
      if (selectionString == " " || selectionString == "") return;

      const start = script.indexOf(selectionString);
      const end = start + selectionString.length - 1;

      dispatch(
        updateSelections(getSelections([...selections, { start, end }]))
      ); // init highlights
    }
  };

  const onEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateScript(e.target.value));
  };

  return (
    <TaskContainer gap={10} padding={true} align="end">
      {!base && (
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
              else dispatch(updateSelections([]));
            }}
          >
            <HiStar />
          </ModeButton>
        </ModeButtonContainer>
      )}
      {loading == true || script == null ? (
        <Loading />
      ) : base == true || edit == true ? (
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
