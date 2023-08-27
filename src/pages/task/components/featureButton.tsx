import { transition } from "@/styles/animation";
import { colors } from "@/styles/colors";
import { BoldText } from "@/styles/text";
import { ReactNode, useState } from "react";
import { IconContext } from "react-icons";
import styled from "styled-components";

interface FeatureButtonProps {
  text: string;
  onClick?: () => void;
  children: ReactNode;
  disable?: boolean;
}

const FeatureButton = (props: FeatureButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <FeatureButtonWrapper
      onClick={props.disable !== true ? props.onClick : () => {}}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      disable={props.disable ?? false}
    >
      <IconContext.Provider
        value={{
          color:
            colors[props.disable !== true && hover ? "orange300" : "gray300"],
          style: { maxWidth: "17px", maxHeight: "14px" },
        }}
      >
        {props.children}
      </IconContext.Provider>
      <BoldText
        text={props.text}
        color={props.disable !== true && hover ? "orange300" : "gray300"}
        size={14}
      />
    </FeatureButtonWrapper>
  );
};
export default FeatureButton;

const FeatureButtonWrapper = styled.div<{ disable: boolean }>`
  width: fit-content;
  height: 40px;

  box-sizing: border-box;
  padding: 0px 20px;
  background-color: ${colors["white"]};
  border: 1px solid ${colors["gray200"]};

  &:hover {
    ${(props) =>
      props.disable !== true &&
      `
        background-color: ${colors["orange50"]};
      border: 1px solid ${colors["orange50"]};
    `}
  }
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 3px;

  ${(props) => props.disable !== true && `cursor: pointer;`}
  ${transition}
`;
