import { colors } from "@/styles/colors";
import { ReactNode, useState } from "react";
import { IconContext } from "react-icons";
import styled from "styled-components";

import { transition } from "@/styles/animation";

import { BiDuplicate, BiMessageAdd, BiTrash } from "react-icons/bi";
import { RiSpeakLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { useDispatch } from "react-redux";
import {
  addUtterance,
  changeSpeaker,
  deleteUtterance,
  duplicateUtterance,
} from "@/states/dialogueSlice";
import { initFocus } from "@/states/authorSlice";
import InfoBubble from "../components/infoBubble";
import { text } from "@/states/constant";

const AuthorTool = () => {
  const dispatch = useDispatch();
  const focus: string | null = useSelector(
    (state: RootState) => state.author.focus
  );

  return (
    <AuthorToolWrapper>
      <AuthorToolBox
        active={true}
        text={text.phase_3.task_1.description_1}
        onClick={() => {
          dispatch(addUtterance());
        }}
      >
        <BiMessageAdd />
      </AuthorToolBox>
      <AuthorToolBox
        active={focus !== null}
        text={text.phase_3.task_1.description_2}
        onClick={() => {
          if (focus) dispatch(changeSpeaker(focus));
        }}
      >
        <RiSpeakLine />
      </AuthorToolBox>{" "}
      <AuthorToolBox
        active={focus !== null}
        text={text.phase_3.task_1.description_3}
        onClick={() => {
          if (focus) dispatch(duplicateUtterance(focus));
        }}
      >
        <BiDuplicate />
      </AuthorToolBox>{" "}
      <AuthorToolBox
        active={focus !== null}
        text={text.phase_3.task_1.description_4}
        onClick={() => {
          if (focus) {
            dispatch(deleteUtterance(focus));
            dispatch(initFocus());
          }
        }}
      >
        <BiTrash />
      </AuthorToolBox>
    </AuthorToolWrapper>
  );
};
export default AuthorTool;

const AuthorToolWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

interface AuthorToolBoxProps {
  active: boolean;
  text: string;
  onClick: () => void;
  children: ReactNode;
}
const AuthorToolBox = (props: AuthorToolBoxProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <AuthorToolBoxWrapper
      active={props.active}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={props.active ? props.onClick : () => {}}
    >
      {hover && (
        <InfoBubble text={props.text} bottom={35} align="center" size="small" />
      )}
      <IconContext.Provider
        value={{
          color:
            colors[
              props.active == false
                ? "gray200"
                : hover
                ? "orange300"
                : "gray350"
            ],
          style: { width: "18px", height: "auto" },
        }}
      >
        {props.children}
      </IconContext.Provider>
    </AuthorToolBoxWrapper>
  );
};
const AuthorToolBoxWrapper = styled.div<{ active: boolean }>`
  width: 38px;
  height: 38px;

  overflow: visible;

  position: relative;
  box-sizing: border-box;
  border: 1px solid ${(props) => colors[props.active ? "gray200" : "gray100"]};
  border-radius: 5px;

  &:hover {
    ${(props) =>
      props.active &&
      `
      border: 1px solid ${colors["orange50"]};
      background-color: ${colors["orange50"]};
    `}
  }

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  ${transition}
`;
