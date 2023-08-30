import { useSelector } from "react-redux";
import TaskContainer from "../components/taskContainer";
import { RootState } from "@/states/state";
import FeatureButton from "../components/featureButton";
import { text } from "@/states/constant";
import { BiRefresh } from "react-icons/bi";
import Loading from "../components/loading";
import DialogueCard from "./dialogueCard";
import DialogueModal from "./modal/modal";
import { useDispatch } from "react-redux";
import { initTask, updateLoading } from "@/states/phaseSlice";
import { updateDialogue } from "@/states/dialogueSlice";
import { getDialogue, getDialogueBase } from "@/apis/lab";
import { getSelectionString } from "../gen/utils";
import styled from "styled-components";
import { initGeneration, updateGeneration } from "@/states/dataSlice";
import LevelTable from "./levelTable";
import { useEffect } from "react";

const Result = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.phase.loading);
  const base = useSelector((state: RootState) => state.phase.base);

  const dialogue = useSelector((state: RootState) => state.dialogue.dialogue);
  const generation = useSelector((state: RootState) => state.data.generation);

  const script = useSelector((state: RootState) => state.userData.script);
  const fullScript = useSelector(
    (state: RootState) => state.userData.fullScript
  );
  const scenario = useSelector((state: RootState) => state.userData.scenario);
  const rubric = useSelector((state: RootState) => state.userData.rubric);
  const selections = useSelector(
    (state: RootState) => state.userData.selections
  );

  useEffect(() => {
    console.log("generation", generation);
  }, [generation]);

  const onClose = () => {
    dispatch(updateDialogue([]));
    dispatch(initTask());
  };

  const onReload = async () => {
    dispatch(updateLoading(true));
    dispatch(initGeneration());

    if (!script) return;
    let dialogues;
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

    if (base) {
      dialogues = await getDialogueBase({ ...data, is_baseline: true });
    } else dialogues = await getDialogue(data);

    dispatch(updateGeneration(dialogues));
    dispatch(updateLoading(false));
  };

  return (
    <TaskContainer gap={15} padding={true} align="start">
      {dialogue.length == 0 ? (
        <DialogueCardContainer>
          <FeatureButton
            text={text.phase_2.task_2.button_1}
            onClick={onReload}
            disable={generation.length == 0}
          >
            <BiRefresh />
          </FeatureButton>
          {loading && <Loading />}

          {generation.length !== 0 && (
            <DialogueCardWrapper>
              <DialogueCard
                idx={1}
                strategy={generation[0].teaching_strategies}
                summary={generation[0].learning_objective}
                patterns={generation[0].patterns}
                scenario={generation[0].teaching_scenario}
                level={generation[0].understanding_states}
                dialogue={generation[0].uttrs}
              />
              <DialogueCard
                idx={2}
                strategy={generation[1].teaching_strategies}
                summary={generation[1].learning_objective}
                patterns={generation[1].patterns}
                scenario={generation[1].teaching_scenario}
                level={generation[1].understanding_states}
                dialogue={generation[1].uttrs}
              />
            </DialogueCardWrapper>
          )}
          {generation.length !== 0 && (
            <DialogueCardWrapper>
              <DialogueCard
                idx={3}
                strategy={generation[2].teaching_strategies}
                summary={generation[2].learning_objective}
                patterns={generation[2].patterns}
                scenario={generation[2].teaching_scenario}
                level={generation[2].understanding_states}
                dialogue={generation[2].uttrs}
              />
              <DialogueCard
                idx={4}
                strategy={generation[3].teaching_strategies}
                summary={generation[3].learning_objective}
                patterns={generation[3].patterns}
                scenario={generation[3].teaching_scenario}
                level={generation[3].understanding_states}
                dialogue={generation[3].uttrs}
              />
            </DialogueCardWrapper>
          )}
          {!base && <LevelTable />}
        </DialogueCardContainer>
      ) : (
        <DialogueModal onClose={onClose} />
      )}
    </TaskContainer>
  );
};

export default Result;

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
