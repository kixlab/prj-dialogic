import { donePhase, doneTask, initTask } from "@/states/phaseSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStatus } from "../utils";
import SubTask from "../components/subtask";
import TaskContainer from "../components/taskContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import DialogueModal from "./modal/modal";
import styled from "styled-components";
import DialogueCard from "./dialogueCard";
import { updateDialogue } from "@/states/dataSlice";
import { getDialogue } from "@/apis/lab";
import { getSelectionString } from "../gen/utils";

const Eval = () => {
  const [step, setStep] = useState<number>(1);
  const dialogue = useSelector((state: RootState) => state.data.dialogue);

  const script = useSelector((state: RootState) => state.userData.script);
  const fullScript = useSelector(
    (state: RootState) => state.userData.fullScript
  );
  const scenario = useSelector((state: RootState) => state.userData.scenario);
  const rubric = useSelector((state: RootState) => state.userData.rubric);
  const selections = useSelector(
    (state: RootState) => state.userData.selections
  );

  const dispatch = useDispatch();

  useEffect(() => {
    //{full_script:string, selected_script:string, highlights:List[string], teaching_scenario:str, rubric:str}
    //scenario는 {“number_tutee”: N, “learning_context”: learning_context, “learning_scenario”: learning_scenario
    const asyncWrapper = async () => {
      if (!script || !fullScript || !rubric) return;

      const data = {
        full_script: fullScript,
        selected_script: script,
        highlights: getSelectionString(script, selections),
        teaching_scenario: {
          number_tutee: scenario.tutee,
          learning_context: scenario.context,
          learning_scenario: scenario.scenario,
        },
        rubric,
      };
      console.log("request", data);
      const dialogues = await getDialogue(data);
      console.log(dialogues);
    };
    asyncWrapper();
  });

  useEffect(() => {
    if (dialogue.length == 0) dispatch(initTask());
    else dispatch(doneTask());
  }, [dialogue]);

  const onNext = () => {
    if (step == 1) {
      dispatch(donePhase());
    }
    setStep((prevStep) => prevStep + 1);
  };

  const onClose = () => {
    dispatch(updateDialogue([]));
    dispatch(initTask());
  };

  return (
    <>
      <SubTask
        type="long"
        title="Select a one dialogue"
        subtitle="This is the test task1 and the subtitle"
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <TaskContainer gap={15} padding={true} align="start">
          {dialogue.length == 0 ? (
            <>
              <DialogueCardWrapper>
                <DialogueCard />
                <DialogueCard />
              </DialogueCardWrapper>
              <DialogueCardWrapper>
                <DialogueCard />
                <DialogueCard />
              </DialogueCardWrapper>
            </>
          ) : (
            <DialogueModal onClose={onClose} />
          )}
        </TaskContainer>
      </SubTask>
    </>
  );
};

export default Eval;

const DialogueCardWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  gap: 15px;
`;
