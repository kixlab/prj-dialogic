import styled from "styled-components";
import Header from "./components/header";
import PhaseButton from "./components/phaseButton";

const Task = () => {
  return (
    <TaskLayout>
      <Header />
      <PhaseButton />
    </TaskLayout>
  );
};

export default Task;

const TaskLayout = styled.div`
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background-color: lightgray;
`;
