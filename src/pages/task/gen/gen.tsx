import { useState } from "react";
import SubTask from "../components/subtask";
import { useDispatch } from "react-redux";
import { donePhase } from "@/states/phaseSlice";
import { getStatus } from "../utils";

const Gen = () => {
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();

  const onNext = () => {
    if (step == 5) {
      dispatch(donePhase());
    }
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <SubTask
        type="short"
        title="This is the test task1"
        subtitle="This is the test task1 and the subtitle"
        status={getStatus(1, step)}
        onNext={onNext}
      >
        task1
      </SubTask>
      <SubTask
        type="short"
        title="This is the test task2"
        subtitle="This is the test task2 and the subtitle"
        status={getStatus(2, step)}
        onNext={onNext}
      >
        task2
      </SubTask>
      <SubTask
        type="short"
        title="This is the test task3"
        subtitle="This is the test task3 and the subtitle"
        status={getStatus(3, step)}
        onNext={onNext}
      >
        task3
      </SubTask>
      <SubTask
        type="short"
        title="This is the test task4"
        subtitle="This is the test task4 and the subtitle"
        status={getStatus(4, step)}
        onNext={onNext}
      >
        task4
      </SubTask>
      <SubTask
        type="short"
        title="This is the test task5"
        subtitle="This is the test task5 and the subtitle"
        status={getStatus(5, step)}
        onNext={onNext}
      >
        task5
      </SubTask>
    </>
  );
};

export default Gen;
