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
    if (phase == 3) {
      navigate("/");
      dispatch(initPhase());
    } else {
      dispatch(nextPhase());
    }
  };

  return <Button name="continue" onClick={onClick} color="blue" />;
};

export default PhaseButton;
