import styled from "styled-components";
import { colors } from "./styles";

interface ButtonProps {
  name: string;
  color: keyof typeof colors;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  return <ButtonWrapper {...props}>{props.name}</ButtonWrapper>;
};

export default Button;

const ButtonWrapper = styled.div<ButtonProps>`
  padding: 10px 8px;
  background-color: ${(props) => colors[props.color]};
  color: black;
  cursor: pointer;
`;
