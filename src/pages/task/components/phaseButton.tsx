import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initPhase, nextPhase } from "@/states/phaseSlice";
import { RootState } from "@/states/state";
import Button from "@/components/button";

const PhaseButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phase: number = useSelector((state: RootState) => state.phase.phase);

  const onClick = () => {
    switch (phase) {
      case 1:
        dispatch(nextPhase());
        navigate("/task/eval");
        break;
      case 2:
        dispatch(nextPhase());
        navigate("/task/author");
        break;
      case 3:
        dispatch(initPhase());
        navigate("/");
        break;
    }
  };

  return <Button name="continue" onClick={onClick} color="blue" />;
};

export default PhaseButton;
