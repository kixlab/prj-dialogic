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
        title="Revise the selected dialogue"
        subtitle="Directly modify or utilize the toolbox on the left for each utterance. Alter the sequence of utterances through drag-and-drop. Provide a title for the final dialogue."
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <Dialogue />
      </SubTask>
      <SubTask
        type="long"
        title="Download the final dialogue"
        subtitle="Click download to save as pdf."
        status={getStatus(2, step)}
        onNext={onNext}
      >
        <AuthorDownload />
      </SubTask>
    </>
  );
};

export default Author;
