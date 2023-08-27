import { colors } from "@/styles/colors";
import styled from "styled-components";

interface InfoBubbleProps {
  text: string;
  bottom?: number;
  left?: number;
  align: "left" | "center" | "right";
  size: "small" | "large";
}

const InfoBubble = (props: InfoBubbleProps) => {
  return (
    <InfoBubbleWrapper {...props}>
      <InfoBubbleContainer {...props}>
        <AuthorText {...props}>{props.text}</AuthorText>
      </InfoBubbleContainer>
      <AuthorTriangle {...props} />
    </InfoBubbleWrapper>
  );
};
export default InfoBubble;

const InfoBubbleWrapper = styled.div<InfoBubbleProps>`
  width: fit-content;
  height: fit-content;

  position: absolute;
  ${(props) => props.bottom && `bottom: ${props.bottom}px;`}
  ${(props) => props.left && `left: ${props.left}px;`}

  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.align == "left"
      ? "flex-start"
      : props.align == "center"
      ? "center"
      : "flex-end"};

  opacity: 0.9;
`;

const InfoBubbleContainer = styled.div<InfoBubbleProps>`
  width: fit-content;
  height: fit-content;

  box-sizing: border-box;
  padding: ${(props) => (props.size == "small" ? "4px 7px" : "7px 10px")};
  background-color: ${colors["gray400"]};
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const AuthorText = styled.div<InfoBubbleProps>`
  color: ${colors["white"]};
  font-size: ${(props) => (props.size == "small" ? "11px" : "12px")};
  white-space: pre;
`;

const AuthorTriangle = styled.div<InfoBubbleProps>`
  width: 8px;
  height: 8px;

  ${(props) => props.align == "left" && `margin-left: 5px;`}
  ${(props) => props.align == "right" && `margin-right: 5px;`}

  position: relative;
  bottom: 5px;

  background-color: ${colors["gray400"]};
  transform: rotate(45deg);
`;
