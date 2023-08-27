/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { updateDialogue } from "@/states/dialogueSlice";
import { getDialogue } from "@/apis/lab";
import { getSelectionString } from "../gen/utils";
import FeatureButton from "../components/featureButton";
import { BiRefresh } from "react-icons/bi";

const Eval = () => {
  const [step, setStep] = useState<number>(1);
  const [reload, setReload] = useState<number>(0); // -1 indicates reload ends
  const [data, setData] = useState<any[]>([]);
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
    console.log(data);
  }, [data]);

  useEffect(() => {
    //{full_script:string, selected_script:string, highlights:List[string], teaching_scenario:str, rubric:str}
    //scenario는 {“number_tutee”: N, “learning_context”: learning_context, “learning_scenario”: learning_scenario
    const asyncWrapper = async () => {
      console.log("hi");
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
      console.log("hi2");

      const dialogues = await getDialogue(data);
      setData(Object.values(dialogues));
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

  const onReload = () => {
    if (4 * (reload + 2) > data.length) return;

    if (reload == 3) setReload(-1);
    else setReload((prev) => prev + 1);
  };

  return (
    <>
      <SubTask
        type="long"
        title="Select a one dialogue"
        subtitle={`Select a dialogue you want to revise. You can reload ${
          3 - reload
        } more times.`}
        status={getStatus(1, step)}
        onNext={onNext}
      >
        <TaskContainer gap={15} padding={true} align="start">
          {dialogue.length == 0 ? (
            <DialogueCardContainer>
              <FeatureButton
                text="Reload"
                disable={reload == -1}
                onClick={onReload}
              >
                <BiRefresh />
              </FeatureButton>
              {data.length !== 0 && (
                <DialogueCardWrapper>
                  <DialogueCard
                    idx={0 + (reload + 1)}
                    strategy={data[reload].teaching_strategies}
                    summary={data[reload].learning_objective}
                    patterns={data[reload].patterns}
                    scenario={data[reload].teaching_scenario}
                    level={data[reload].understanding_states}
                    dialogue={data[reload].uttrs}
                  />
                  <DialogueCard
                    idx={1 + (reload + 1)}
                    strategy={data[reload + 1].teaching_strategies}
                    summary={data[reload + 1].learning_objective}
                    patterns={data[reload + 1].patterns}
                    scenario={data[reload + 1].teaching_scenario}
                    level={data[reload + 1].understanding_states}
                    dialogue={data[reload + 1].uttrs}
                  />{" "}
                </DialogueCardWrapper>
              )}
              {data.length !== 0 && (
                <DialogueCardWrapper>
                  <DialogueCard
                    idx={2 + (reload + 1)}
                    strategy={data[reload + 2].teaching_strategies}
                    summary={data[reload + 2].learning_objective}
                    patterns={data[reload + 2].patterns}
                    scenario={data[reload + 2].teaching_scenario}
                    level={data[reload + 2].understanding_states}
                    dialogue={data[reload + 2].uttrs}
                  />{" "}
                  <DialogueCard
                    idx={3 + (reload + 1)}
                    strategy={data[reload + 3].teaching_strategies}
                    summary={data[reload + 3].learning_objective}
                    patterns={data[reload + 3].patterns}
                    scenario={data[reload + 3].teaching_scenario}
                    level={data[reload + 3].understanding_states}
                    dialogue={data[reload + 3].uttrs}
                  />
                </DialogueCardWrapper>
              )}
            </DialogueCardContainer>
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

const DialogueCardContainer = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
`;
