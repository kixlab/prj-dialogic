import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/states/state";
import { initPhase, nextPhase, updateBase } from "@/states/phaseSlice";
import { useEffect } from "react";
import Header from "./task/components/header";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { transition } from "@/styles/animation";
import { BoldText } from "@/styles/text";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phase: number = useSelector((state: RootState) => state.phase.phase);

  useEffect(() => {
    dispatch(initPhase());
  });

  const onStart = (base: boolean) => {
    if (phase == 0) {
      dispatch(nextPhase());
      dispatch(updateBase(base));
      if (base) navigate("/base");
      else navigate("/task");
    }
  };

  return (
    <MainPage>
      <Header disable={true} />
      <MainBody>
        <MainButton onClick={() => onStart(true)}>
          <BoldText text="Baseline" color="gray400" size={20} />
        </MainButton>
        <MainButton onClick={() => onStart(false)}>
          <BoldText text="System" color="gray400" size={20} />
        </MainButton>
      </MainBody>
    </MainPage>
  );
};

export default Main;

const MainPage = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${colors["gray50"]};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainBody = styled.div`
  width: 100%;
  flex: 1;

  box-sizing: border-box;
  padding-bottom: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MainButton = styled.div`
  width: 340px;
  height: 60px;

  border-radius: 10px;
  background-color: ${colors["green50"]};
  border: 2px solid ${colors["green100"]};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors["green100"]};
  }
  cursor: pointer;
  ${transition}
`;
