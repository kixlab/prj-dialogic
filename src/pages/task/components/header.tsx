import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";

import { BlackText, BoldText, RegularText } from "@/styles/text";
import { colors } from "@/styles/colors";
import HeaderIconImg from "@/assets/dialogic.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const phase: number = useSelector((state: RootState) => state.phase.phase);
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <HeaderIcon src={HeaderIconImg} onClick={() => navigate("/")} />
      <HeaderStage stage={1} state={phase == 1 ? "OnGoing" : "Done"} />
      <HeaderStage
        stage={2}
        state={phase == 2 ? "OnGoing" : phase == 1 ? "Pending" : "Done"}
      />
      <HeaderStage stage={3} state={phase == 3 ? "OnGoing" : "Pending"} />
    </HeaderWrapper>
  );
};
export default Header;

const HeaderIcon = styled.img`
  width: 75px;

  position: absolute;
  top: 50%;
  left: 40px;
  transform: translate(-0%, -50%);

  cursor: pointer;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;

  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

interface HeaderStageProps {
  stage: number;
  state: "Pending" | "OnGoing" | "Done";
}

const stageName = (stage: number): string => {
  switch (stage) {
    case 1:
      return "Generation";
    case 2:
      return "Evaluation";
    case 3:
      return "Authoring";
    default:
      return "Undefined";
  }
};

const HeaderStage = (props: HeaderStageProps) => {
  const color: keyof typeof colors =
    props.state == "Pending"
      ? "gray300"
      : props.state == "OnGoing"
      ? "green300"
      : "gray400";

  return (
    <HeaderStageWrapper {...props}>
      <HeaderStageNum {...props}>
        <BlackText text={props.stage.toString()} color={color} size={13} />
      </HeaderStageNum>
      {props.state == "OnGoing" ? (
        <BoldText text={stageName(props.stage)} color={color} size={16} />
      ) : (
        <RegularText text={stageName(props.stage)} color={color} size={16} />
      )}
    </HeaderStageWrapper>
  );
};

const HeaderStageWrapper = styled.div<HeaderStageProps>`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const HeaderStageNum = styled.div<HeaderStageProps>`
  width: 20px;
  height: 20px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors["gray100"]};

  background-color: ${(props) =>
    colors[
      props.state == "Pending"
        ? "gray100"
        : props.state == "OnGoing"
        ? "green100"
        : "gray200"
    ]};
`;
