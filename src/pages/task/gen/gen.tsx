import { useState } from "react";
import SubTask from "../components/subtask";
import { useDispatch } from "react-redux";
import { donePhase } from "@/states/phaseSlice";
import { getStatus } from "../utils";

import Upload from "./upload";
import Trim from "./trim";
import Script from "./script";
import Scenario from "./scenario";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { text } from "@/states/constant";

const Gen = () => {
  const [step, setStep] = useState<number>(1);
  const base = useSelector((state: RootState) => state.phase.base);
  const dispatch = useDispatch();

  const onNext = () => {
    if (base && step == 4) {
      dispatch(donePhase());
    } else if (step == 3) dispatch(donePhase());
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <SubTask
        type="short"
        title={text.phase_1.task_1.title}
        subtitle={text.phase_1.task_1.description}
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <Upload />
      </SubTask>
      <SubTask
        type="short"
        title={text.phase_1.task_2.title}
        subtitle={text.phase_1.task_2.description}
        status={getStatus(2, step)}
        onNext={onNext}
      >
        <Trim />
      </SubTask>
      <SubTask
        type="short"
        title={text.phase_1[base == true ? "task_3_base" : "task_3"].title}
        subtitle={
          text.phase_1[base == true ? "task_3_base" : "task_3"].description
        }
        status={getStatus(3, step)}
        onNext={onNext}
      >
        <Script />
      </SubTask>
      {!base && (
        <SubTask
          type="short"
          title={text.phase_1.task_4.title}
          subtitle={text.phase_1.task_4.description}
          status={getStatus(4, step)}
          onNext={onNext}
        >
          <Scenario />
        </SubTask>
      )}
    </>
  );
};

export default Gen;
