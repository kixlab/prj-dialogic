import styled from "styled-components";
import TaskContainer from "../components/taskContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { useDispatch } from "react-redux";
import { updateRubric, updateScenario } from "@/states/userDataSlice";
import { tuteeToNumber } from "./utils";
import { useEffect } from "react";
import { doneTask, updateLoading } from "@/states/phaseSlice";
import { text } from "@/states/constant";
import InputContainer from "../components/inputContainer";
import { getRubric } from "@/apis/lab";
import Loading from "../components/loading";

const Scenario = () => {
  const dispatch = useDispatch();

  const scenario: { tutee: number; context: string; scenario: string } =
    useSelector((state: RootState) => state.userData.scenario);
  const script: string | null = useSelector(
    (state: RootState) => state.userData.script
  );
  const loading = useSelector((state: RootState) => state.phase.loading);

  useEffect(() => {
    const asyncWrapper = async () => {
      dispatch(updateLoading(true));
      if (!script) return;
      const rubric = await getRubric(script);
      dispatch(updateRubric(rubric.rubric));
      dispatch(doneTask());
      dispatch(updateLoading(false));
    };
    asyncWrapper();
  }, []);

  return (
    <TaskContainer gap={10} padding={true} align="start">
      <ScenarioRowWrapper>
        <InputContainer
          title={text.phase_1.task_4.button_1}
          description=""
          value={scenario.tutee.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(
              updateScenario({
                ...scenario,
                tutee: tuteeToNumber(e.target.value),
              })
            );
          }}
          option={false}
          hover={false}
        />
        <InputContainer
          title={text.phase_1.task_4.button_2.title}
          description={text.phase_1.task_4.button_2.description}
          value={scenario.context}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(updateScenario({ ...scenario, context: e.target.value }));
          }}
          option={true}
          hover={true}
        />
      </ScenarioRowWrapper>
      <ScenarioRowWrapper>
        <InputContainer
          title={text.phase_1.task_4.button_3.title}
          description={text.phase_1.task_4.button_3.description}
          value={scenario.scenario}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(updateScenario({ ...scenario, scenario: e.target.value }));
          }}
          option={true}
          hover={true}
        />
      </ScenarioRowWrapper>
      {loading && <Loading />}
    </TaskContainer>
  );
};

export default Scenario;

const ScenarioRowWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  gap: 20px;
`;
