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
import Loading from "../components/loading";
import { text } from "@/states/constant";

const Eval = () => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const loading = useSelector((state: RootState) => state.phase.loading);
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
      setData(Object.values(dialogues));
      dispatch(updateLoading(false));
    };
    asyncWrapper();
  }, []);

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

  const onReload = async () => {
    dispatch(updateLoading(true));
    setData([]);
    if (!script) return;
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
    setData(Object.values(dialogues));
    dispatch(updateLoading(false));
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
        <TaskContainer gap={15} padding={true} align="start">
          {dialogue.length == 0 ? (
            <DialogueCardContainer>
              <FeatureButton
                text={text.phase_2.task_1.button_1}
                onClick={onReload}
                disable={data.length == 0}
              >
                <BiRefresh />
              </FeatureButton>
              {loading && <Loading />}

              {data.length !== 0 && (
                <DialogueCardWrapper>
                  <DialogueCard
                    idx={1}
                    strategy={data[0].teaching_strategies}
                    summary={data[0].learning_objective}
                    patterns={data[0].patterns}
                    scenario={data[0].teaching_scenario}
                    level={data[0].understanding_states}
                    dialogue={data[0].uttrs}
                  />
                  <DialogueCard
                    idx={2}
                    strategy={data[1].teaching_strategies}
                    summary={data[1].learning_objective}
                    patterns={data[1].patterns}
                    scenario={data[1].teaching_scenario}
                    level={data[1].understanding_states}
                    dialogue={data[1].uttrs}
                  />{" "}
                </DialogueCardWrapper>
              )}
              {data.length !== 0 && (
                <DialogueCardWrapper>
                  <DialogueCard
                    idx={3}
                    strategy={data[2].teaching_strategies}
                    summary={data[2].learning_objective}
                    patterns={data[2].patterns}
                    scenario={data[2].teaching_scenario}
                    level={data[2].understanding_states}
                    dialogue={data[2].uttrs}
                  />{" "}
                  <DialogueCard
                    idx={4}
                    strategy={data[3].teaching_strategies}
                    summary={data[3].learning_objective}
                    patterns={data[3].patterns}
                    scenario={data[3].teaching_scenario}
                    level={data[3].understanding_states}
                    dialogue={data[3].uttrs}
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
