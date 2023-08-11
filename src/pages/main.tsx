import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div>this is main page</div>
      <Link to="/task">
        <div>go to task</div>
      </Link>
    </div>
  );
};

export default Main;
