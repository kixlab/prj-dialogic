import { transition } from "@/styles/animation";
import { colors } from "@/styles/colors";
import { RegularText } from "@/styles/text";
import { ReactNode } from "react";
import { IconContext } from "react-icons";
import styled from "styled-components";

export const ModeButtonContainer = styled.div`
  width: fit-content;
  height: fit-content;

  box-sizing: border-box;
  padding: 4px;
  background-color: ${colors["gray100"]};
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3px;
`;

interface ModeButtonProps {
  text: string;
  width: "long" | "medium" | "short";
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export const ModeButton = (props: ModeButtonProps) => {
  return (
    <ModeButtonWrapper {...props}>
      <IconContext.Provider
        value={{
          color: colors[props.active ? "orange100" : "gray200"],
          style: { height: "15px" },
        }}
      >
        {props.children}
      </IconContext.Provider>
      {props.active == true ? (
        <RegularText text={props.text} color="black" size={13} />
      ) : (
        <RegularText text={props.text} color="gray300" size={13} />
      )}
    </ModeButtonWrapper>
  );
};

const ModeButtonWrapper = styled.div<ModeButtonProps>`
  width: ${(props) =>
    props.width == "long"
      ? "120px"
      : props.width == "medium"
      ? "110px"
      : "95px"};
  height: 32px;

  background-color: ${(props) =>
    colors[props.active == true ? "white" : "gray100"]};
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  cursor: pointer;
  ${transition}
`;
