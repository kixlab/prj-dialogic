import { useEffect, useState } from "react";
import TaskContainer from "../components/taskContainer";
import FeatureButton from "../components/featureButton";
import { HiDocumentText } from "react-icons/hi";
import { text } from "@/states/constant";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { addMarks } from "../gen/utils";
import InputContainer from "../components/inputContainer";
import { useDispatch } from "react-redux";
import { updateReasons, updateRubric } from "@/states/userDataSlice";
import { doneTask, initTask } from "@/states/phaseSlice";
import { getRubric } from "@/apis/lab";

const Intention = () => {
  const [see, setSee] = useState<boolean>(false);
  const dispatch = useDispatch();

  const script = useSelector((state: RootState) => state.userData.script);
  const selections = useSelector(
    (state: RootState) => state.userData.selections
  );
  const reasons = useSelector((state: RootState) => state.userData.reasons);
  const base = useSelector((state: RootState) => state.phase.base);
  const rubric = useSelector((state: RootState) => state.userData.rubric);

  useEffect(() => {
    const asyncWrapper = async () => {
      // for baseline rubric
      if (!script) return;
      const rubric = await getRubric(script);
      dispatch(updateRubric(rubric.rubric));
      if (reasons[0].length !== 0 && reasons[1].length !== 0)
        dispatch(doneTask());
    };
    //dialogue generation
    const container = document.getElementById("scriptContainer");
    if (!container || !script) return;
    container.innerHTML = addMarks(script, selections);
    if (base) asyncWrapper();
  });

  useEffect(() => {
    if (reasons[0].length !== 0 && reasons[1].length !== 0 && rubric !== null)
      dispatch(doneTask());
    else dispatch(initTask());
  }, [reasons]);

  return (
    <TaskContainer gap={15} padding={true} align="start">
      <FeatureButton
        text={see ? text.phase_2.task_1.button_1 : text.phase_2.task_1.button_2}
        onClick={() => setSee((prev) => !prev)}
      >
        <HiDocumentText />
      </FeatureButton>
      <IntentionWrapper>
        {see && <ScriptContainer id="scriptContainer" />}
        <IntentionContainer fill={!see}>
          <InputContainer
            title={text.phase_2.task_1.button_3.title}
            description={text.phase_2.task_1.button_3.description}
            value={reasons[0]}
            option={false}
            hover={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(updateReasons({ idx: 0, reason: e.target.value }));
            }}
          />
          <InputContainer
            title={text.phase_2.task_1.button_4.title}
            description={text.phase_2.task_1.button_4.description}
            value={reasons[1]}
            option={false}
            hover={true}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(updateReasons({ idx: 1, reason: e.target.value }));
            }}
          />
        </IntentionContainer>
      </IntentionWrapper>
    </TaskContainer>
  );
};
export default Intention;
const IntentionWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 30px;
`;

const ScriptContainer = styled.div`
  flex: 1;

  box-sizing: border-box;
  padding: 12px 18px;
  background-color: ${colors["gray50"]};
  color: ${colors["gray400"]};
  border-radius: 5px;

  font-weight: medium;
  font-size: 15px;
  line-height: 1.6;
`;

const IntentionContainer = styled.div<{ fill: boolean }>`
  flex: 1;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;
