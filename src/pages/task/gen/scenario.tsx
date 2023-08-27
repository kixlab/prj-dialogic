import { colors } from "@/styles/colors";
import { BoldText } from "@/styles/text";
import { IconContext } from "react-icons";
import { BiInfoCircle } from "react-icons/bi";
import styled from "styled-components";
import TaskContainer from "../components/taskContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { useDispatch } from "react-redux";
import { updateScenario } from "@/states/userDataSlice";
import {
  contextDescription,
  learningDescription,
  tuteeToNumber,
} from "./utils";
import { useEffect, useState } from "react";
import { doneTask } from "@/states/phaseSlice";
import InfoBubble from "../components/infoBubble";

const Scenario = () => {
  const scenario: { tutee: number; context: string; scenario: string } =
    useSelector((state: RootState) => state.userData.scenario);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doneTask());
  }, []);

  return (
    <TaskContainer gap={10} padding={true} align="start">
      <ScenarioRowWrapper>
        <ScenarioInput
          title="Number of Tutee"
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
        <ScenarioInput
          title="Learning Context"
          description={contextDescription}
          value={scenario.context}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(updateScenario({ ...scenario, context: e.target.value }));
          }}
          option={true}
          hover={true}
        />
      </ScenarioRowWrapper>
      <ScenarioRowWrapper>
        <ScenarioInput
          title="Learning Scenario"
          description={learningDescription}
          value={scenario.scenario}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(updateScenario({ ...scenario, scenario: e.target.value }));
          }}
          option={true}
          hover={true}
        />
      </ScenarioRowWrapper>
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

interface ScenarioInputProps {
  title: string;
  description: string;
  value: string;
  option: boolean;
  hover: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScenarioInput = (props: ScenarioInputProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <ScenarioInputWrapper {...props}>
      <ScenarioInputTitleWrapper
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {props.hover && hover && (
          <InfoBubble
            text={props.description}
            bottom={15}
            align="left"
            size="large"
          />
        )}
        <BoldText text={props.title} color="gray300" size={15} />
        {!props.option && <BoldText text="*" color="green300" size={14} />}
        {props.hover && (
          <IconContext.Provider
            value={{
              color: colors["gray300"],
              style: {
                width: "18px",
                height: "18px",
                cursor: "pointer",
                marginTop: "1px",
              },
            }}
          >
            <BiInfoCircle />
          </IconContext.Provider>
        )}
      </ScenarioInputTitleWrapper>
      <ScenarioInputField value={props.value} onChange={props.onChange} />
    </ScenarioInputWrapper>
  );
};

const ScenarioInputWrapper = styled.div<ScenarioInputProps>`
  flex: 1;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
const ScenarioInputTitleWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 3px;
`;
const ScenarioInputField = styled.input`
  width: 100%;
  height: 40px;

  background-color: ${colors["gray50"]};
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;
  outline: none;

  &:focus {
    outline: none;
    border: 1.5px solid ${colors["green200"]};
  }

  box-sizing: border-box;
  padding: 10px 15px;
`;
