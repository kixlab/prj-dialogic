import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/states/state";
import { initPhase, nextPhase } from "@/states/phaseSlice";
import { useEffect } from "react";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phase: number = useSelector((state: RootState) => state.phase.phase);

  useEffect(() => {
    dispatch(initPhase());
  });

  const onClick = () => {
    if (phase == 0) {
      dispatch(nextPhase());
      navigate("/task/gen");
    }
  };

  return (
    <div>
      <div>this is main page</div>
      <Button color="white" name="Start" onClick={onClick} />
    </div>
  );
};

export default Main;
