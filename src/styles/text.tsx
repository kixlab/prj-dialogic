import styled from "styled-components";
import { colors } from "./colors";

interface TextOption {
  size: number;
  color: keyof typeof colors;
  text: string;
}

// thin-100 light-300 regular-400 bold-700 black-900

export const LightText = (props: TextOption) => {
  return (
    <TextWrapper {...props} style={{ fontWeight: 300 }}>
      {props.text}
    </TextWrapper>
  );
};

export const RegularText = (props: TextOption) => {
  return (
    <TextWrapper {...props} style={{ fontWeight: 400 }}>
      {props.text}
    </TextWrapper>
  );
};

export const BoldText = (props: TextOption) => {
  return (
    <TextWrapper {...props} style={{ fontWeight: 700 }}>
      {props.text}
    </TextWrapper>
  );
};

export const BlackText = (props: TextOption) => {
  return (
    <TextWrapper {...props} style={{ fontWeight: 900 }}>
      {props.text}
    </TextWrapper>
  );
};

const TextWrapper = styled.div<TextOption>`
  font-size: ${(props) => `${props.size}px`};
  color: ${(props) => colors[props.color]};
`;
