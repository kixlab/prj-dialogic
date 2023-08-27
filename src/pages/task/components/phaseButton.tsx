import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initPhase, nextPhase } from "@/states/phaseSlice";
import { RootState } from "@/states/state";
import styled from "styled-components";
import { BoldText } from "@/styles/text";
import { colors } from "@/styles/colors";
import { transition } from "@/styles/animation";

const PhaseButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phase: number = useSelector((state: RootState) => state.phase.phase);
  const base: boolean = useSelector((state: RootState) => state.phase.base);
  const done: boolean = useSelector((state: RootState) => state.phase.done);

  const onClick = () => {
    if (done == false) return;

    switch (phase) {
      case 1:
        dispatch(nextPhase());
        if (base) navigate("/base/eval");
        else navigate("/task/eval");
        break;
      case 2:
        dispatch(nextPhase());
        if (base) navigate("/base/author");
        else navigate("/task/author");
        break;
      case 3:
        dispatch(initPhase());
        navigate("/");
        window.location.reload();
        break;
    }
  };

  return (
    <PhaseButtonWrapper onClick={onClick} done={done}>
      <BoldText
        text={phase == 3 ? (done == true ? "🎉Done" : "Done") : "Continue"}
        color="white"
        size={14}
      />
    </PhaseButtonWrapper>
  );
};

export default PhaseButton;

const PhaseButtonWrapper = styled.div<{ done: boolean }>`
  width: 160px;
  height: 38px;

  background-color: ${(props) =>
    colors[props.done == true ? "orange200" : "gray100"]};
  &:hover {
    ${(props) =>
      props.done == true && `background-color: ${colors["orange300"]};`}
    ${transition}
  }
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.done == true && `cursor: pointer;`}
`;
