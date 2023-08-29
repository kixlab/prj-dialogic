/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  donePhase,
  doneTask,
  initTask,
  updateLoading,
} from "@/states/phaseSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStatus } from "../utils";
import SubTask from "../components/subtask";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";

import { getDialogue } from "@/apis/lab";
import { getSelectionString } from "../gen/utils";

import { text } from "@/states/constant";
import Intention from "./intention";
import Result from "./result";
import { initGeneration, updateGeneration } from "@/states/dataSlice";

const Eval = () => {
  const [step, setStep] = useState<number>(1);

  const dialogue = useSelector((state: RootState) => state.dialogue.dialogue);

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
      dispatch(initGeneration());
      dispatch(updateLoading(true));

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
      const dialogues = await getDialogue(data);

      dispatch(updateGeneration(Object.values(dialogues)));
      dispatch(updateLoading(false));
    };
    asyncWrapper();
  }, []);

  useEffect(() => {
    if (dialogue.length == 0) dispatch(initTask());
    else dispatch(doneTask());
  }, [dialogue]);

  const onNext = () => {
    if (step == 2) {
      dispatch(donePhase());
    }
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <SubTask
        type="long"
        title={text.phase_2.task_1.title}
        subtitle={text.phase_2.task_1.description}
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <Intention />
      </SubTask>
      <SubTask
        type="long"
        title={text.phase_2.task_2.title}
        subtitle={text.phase_2.task_2.description}
        status={getStatus(2, step)}
        onNext={onNext}
      >
        <Result />
      </SubTask>
    </>
  );
};

export default Eval;
