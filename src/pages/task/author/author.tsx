import { donePhase, doneTask } from "@/states/phaseSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStatus } from "../utils";
import SubTask from "../components/subtask";
import Dialogue from "./dialogue";
import AuthorDownload from "./authorDownload";

const Author = () => {
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();

  const onNext = () => {
    if (step == 2) {
      dispatch(donePhase());
    }
    setStep((prevStep) => prevStep + 1);
  };

  useEffect(() => {
    dispatch(doneTask());
  }, []);

  return (
    <>
      <SubTask
        type="long"
        title="This is the test task1"
        subtitle="This is the test task1 and the subtitle"
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <Dialogue />
      </SubTask>
      <SubTask
        type="long"
        title="This is the test task2"
        subtitle="This is the test task2 and the subtitle"
        status={getStatus(2, step)}
        onNext={onNext}
      >
        <AuthorDownload />
      </SubTask>
    </>
  );
};

export default Author;
