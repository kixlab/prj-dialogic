import { useState } from "react";
import InfoBubble from "./infoBubble";
import { BoldText } from "@/styles/text";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { IconContext } from "react-icons";
import { BiInfoCircle } from "react-icons/bi";

interface InputContainerProps {
  title: string;
  description: string;
  value: string;
  option: boolean;
  hover: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
}

const InputContainer = (props: InputContainerProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <InputContainerWrapper {...props}>
      <InputContainerTitleWrapper
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {props.hover && hover && (
          <InfoBubble
            text={props.description}
            bottom={15}
            align="left"
            size="large"
          />
        )}
        <BoldText text={props.title} color="gray300" size={15} />
        {!props.option && <BoldText text="*" color="green300" size={14} />}
        {props.hover && (
          <IconContext.Provider
            value={{
              color: colors["gray300"],
              style: {
                width: "18px",
                height: "18px",
                cursor: "pointer",
                marginTop: "1px",
              },
            }}
          >
            <BiInfoCircle />
          </IconContext.Provider>
        )}
      </InputContainerTitleWrapper>
      <InputContainerField
        value={props.value}
        onChange={props.onChange}
        disabled={props.disable ?? false}
      />
    </InputContainerWrapper>
  );
};

export default InputContainer;

const InputContainerWrapper = styled.div<InputContainerProps>`
  flex: 1;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;
const InputContainerTitleWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 3px;
`;
const InputContainerField = styled.input`
  width: 100%;
  height: 40px;

  background-color: ${colors["gray50"]};
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;
  outline: none;

  &:focus {
    outline: none;
    border: 1.5px solid ${colors["green200"]};
  }

  box-sizing: border-box;
  padding: 10px 15px;
`;
