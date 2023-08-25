import styled from "styled-components";
import Header from "./components/header";
import PhaseButton from "./components/phaseButton";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { colors } from "@/styles/colors";

const Task = () => {
  const phase: number = useSelector((state: RootState) => state.phase.phase);
  const navigate = useNavigate();

  useEffect(() => {
    if (phase == 0) navigate("/");
    if (phase == 1) navigate("/task/gen");
  }, []);

  return (
    <TaskLayout>
      <Header />
      <OutletLayout>
        <Outlet />
      </OutletLayout>
      <PhaseButton />
    </TaskLayout>
  );
};

export default Task;

const TaskLayout = styled.div`
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background-color: ${colors["gray50"]};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OutletLayout = styled.div`
  width: 100%;
  height: fit-content;

  padding: 40px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
