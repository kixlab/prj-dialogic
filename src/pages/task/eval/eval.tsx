import { donePhase } from "@/states/phaseSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStatus } from "../utils";
import SubTask from "../components/subtask";

const Eval = () => {
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();

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
        title="This is the test task1"
        subtitle="This is the test task1 and the subtitle"
        status={getStatus(1, step)}
        onNext={onNext}
      >
        task1
      </SubTask>
      <SubTask
        type="long"
        title="This is the test task2"
        subtitle="This is the test task2 and the subtitle"
        status={getStatus(2, step)}
        onNext={onNext}
      >
        task2
      </SubTask>
    </>
  );
};

export default Eval;
