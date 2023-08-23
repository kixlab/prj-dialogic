import { HiDocumentText } from "react-icons/hi";
import { ModeButton, ModeButtonContainer } from "../components/modeButton";
import { BiSolidDetail, BiSolidMagicWand } from "react-icons/bi";
import { Mode } from "./utils";

interface AuthorModeProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const AuthorMode = (props: AuthorModeProps) => {
  return (
    <ModeButtonContainer>
      <ModeButton
        text="Description"
        width="long"
        active={props.mode == "description"}
        onClick={() => {
          props.setMode("description");
        }}
      >
        <BiSolidDetail />
      </ModeButton>
      <ModeButton
        text="Magic"
        width="short"
        active={props.mode == "magic"}
        onClick={() => {
          props.setMode("magic");
        }}
      >
        <BiSolidMagicWand />
      </ModeButton>
      <ModeButton
        text="Transcript"
        width="medium"
        active={props.mode == "transcript"}
        onClick={() => {
          props.setMode("transcript");
        }}
      >
        <HiDocumentText />
      </ModeButton>{" "}
    </ModeButtonContainer>
  );
};

export default AuthorMode;
