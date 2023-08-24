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
}

const FeatureButton = (props: FeatureButtonProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <FeatureButtonWrapper
      onClick={props.onClick}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <IconContext.Provider
        value={{
          color: colors[hover ? "orange300" : "gray300"],
          style: { width: "17px", height: "auto" },
        }}
      >
        {props.children}
      </IconContext.Provider>
      <BoldText
        text={props.text}
        color={hover ? "orange300" : "gray300"}
        size={12}
      />
    </FeatureButtonWrapper>
  );
};
export default FeatureButton;

const FeatureButtonWrapper = styled.div`
  width: fit-content;
  height: 35px;

  box-sizing: border-box;
  padding: 0px 15px;
  background-color: ${colors["white"]};
  border: 1px solid ${colors["gray200"]};

  &:hover {
    background-color: ${colors["orange50"]};
    border: 1px solid ${colors["orange50"]};
  }
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  cursor: pointer;
  ${transition}
`;
