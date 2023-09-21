import { HiDocumentText } from "react-icons/hi";
import { ModeButton, ModeButtonContainer } from "../components/modeButton";
import { BiSolidDetail, BiSolidMagicWand } from "react-icons/bi";
import { AuthorMode } from "@/states/types";
import { useDispatch } from "react-redux";
import { updateTargets } from "@/states/userDataSlice";
import { updateMagic } from "@/states/phaseSlice";
import { text } from "@/states/constant";

interface AuthorModeSelectorProps {
  mode: AuthorMode;
  setMode: React.Dispatch<React.SetStateAction<AuthorMode>>;
}

const AuthorModeSelector = (props: AuthorModeSelectorProps) => {
  const dispatch = useDispatch();

  return (
    <ModeButtonContainer>
      <ModeButton
        text={text.phase_3.task_1.button_1}
        width="long"
        active={props.mode == "description"}
        onClick={() => {
          props.setMode("description");
          dispatch(updateMagic(false));
        }}
      >
        <BiSolidDetail />
      </ModeButton>
      <ModeButton
        text={text.phase_3.task_1.button_2}
        width="long"
        active={props.mode == "magic"}
        onClick={() => {
          props.setMode("magic");
          dispatch(updateTargets([-1, -1]));
          dispatch(updateMagic(true));
        }}
      >
        <BiSolidMagicWand />
      </ModeButton>
      <ModeButton
        text={text.phase_3.task_1.button_3}
        width="medium"
        active={props.mode == "transcript"}
        onClick={() => {
          props.setMode("transcript");
          dispatch(updateMagic(false));
        }}
      >
        <HiDocumentText />
      </ModeButton>{" "}
    </ModeButtonContainer>
  );
};

export default AuthorModeSelector;
