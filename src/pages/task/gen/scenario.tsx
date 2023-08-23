import { colors } from "@/styles/colors";
import { BoldText } from "@/styles/text";
import { IconContext } from "react-icons";
import { BiInfoCircle } from "react-icons/bi";
import styled from "styled-components";
import TaskContainer from "../components/taskContainer";

const Scenario = () => {
  return (
    <TaskContainer gap={10} padding={true} align="start">
      <ScenarioRowWrapper>
        <ScenarioInput
          title="Number of Tutee"
          description=""
          placeholder=""
          option={false}
          hover={false}
        />
        <ScenarioInput
          title="Learning Context"
          description=""
          placeholder=""
          option={true}
          hover={true}
        />
      </ScenarioRowWrapper>
      <ScenarioRowWrapper>
        {" "}
        <ScenarioInput
          title="Learning Scenario"
          description=""
          placeholder=""
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
  placeholder: string;
  option: boolean;
  hover: boolean;
}

const ScenarioInput = (props: ScenarioInputProps) => {
  return (
    <ScenarioInputWrapper {...props}>
      <ScenarioInputTitleWrapper>
        <BoldText text={props.title} color="gray350" size={14} />
        {!props.option && <BoldText text="*" color="green300" size={14} />}
        {props.hover && (
          <IconContext.Provider
            value={{
              color: colors["gray350"],
              style: { width: "18px", height: "auto", cursor: "pointer" },
            }}
          >
            <BiInfoCircle />
          </IconContext.Provider>
        )}
      </ScenarioInputTitleWrapper>
      <ScenarioInputField />
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
  display: flex;
  flex-direction: row;
  gap: 2px;
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
