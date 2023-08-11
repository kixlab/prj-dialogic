import Button from "../components/button";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>this is main page</div>
      <Button color="white" name="Start" onClick={() => navigate("/task")} />
    </div>
  );
};

export default Main;
