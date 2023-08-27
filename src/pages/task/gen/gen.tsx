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
        title="Upload your video"
        subtitle="Choose an English video that is smaller than 25MB in size."
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <Upload />
      </SubTask>
      <SubTask
        type="short"
        title="Trim the video"
        subtitle="Ensure trimming is completed, before clicking Next. Trim can be done only once."
        status={getStatus(2, step)}
        onNext={onNext}
      >
        <Trim />
      </SubTask>
      <SubTask
        type="short"
        title={
          base
            ? "Confirm the transcript"
            : "Confirm the transcript and highlight"
        }
        subtitle={
          base
            ? "Directly edit the auto-generated transcript."
            : "Directly edit the auto-generated transcript. Highlight the part where the learner might have difficult."
        }
        status={getStatus(3, step)}
        onNext={onNext}
      >
        <Script />
      </SubTask>
      {!base && (
        <SubTask
          type="short"
          title="Write the dialogue scenario"
          subtitle="Make sure to fill the number of tutees, while the remaining fields are optional."
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
