import { donePhase, doneTask } from "@/states/phaseSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStatus } from "../utils";
import SubTask from "../components/subtask";
import Dialogue from "./dialogue";
import AuthorDownload from "./authorDownload";
import { text } from "@/states/constant";

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
        title={text.phase_3.task_1.title}
        subtitle={text.phase_3.task_1.description}
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <Dialogue />
      </SubTask>
      <SubTask
        type="long"
        title={text.phase_3.task_2.title}
        subtitle={text.phase_3.task_2.description}
        status={getStatus(2, step)}
        onNext={onNext}
      >
        <AuthorDownload />
      </SubTask>
    </>
  );
};

export default Author;
