import styled from "styled-components";
import Header from "./components/header";
import PhaseButton from "./components/phaseButton";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";

const Task = () => {
  const phase: number = useSelector((state: RootState) => state.phase.phase);
  const navigate = useNavigate();

  useEffect(() => {
    if (phase == 1) navigate("/task/gen");
  }, []);

  return (
    <TaskLayout>
      <Header />
      <Outlet />
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
