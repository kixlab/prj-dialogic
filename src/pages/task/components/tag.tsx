import styled from "styled-components";
import InfoBubble from "./infoBubble";
import { useState } from "react";

const themeColors: Record<string, { text: string; background: string }> = {
  gray: {
    text: "#787774",
    background: "#F1F1EF",
  },
  brown: {
    text: "#976D57",
    background: "#F3EEEE",
  },
  orange: {
    text: "#CC772F",
    background: "#F8ECDF",
  },
  blue: {
    text: "#3a87c2",
    background: "#f0fdff",
  },
  purple: {
    text: "#8d54c9",
    background: "#F6F3F8",
  },
  yellow: {
    text: "#dbb13c",
    background: "#fff7de",
  },
  pink: {
    text: "#e65d7d",
    background: "#F9F2F5",
  },
};

interface TagProps {
  title: string;
  description?: string;
  wrap?: boolean;
  theme: keyof typeof themeColors;
}

const Tag = (props: TagProps) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <TagContainer
      {...props}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {props.description && hover && (
        <InfoBubble
          text={props.description}
          align="center"
          size="small"
          bottom={20}
        />
      )}
      <TagTitle {...props}>{props.title}</TagTitle>
    </TagContainer>
  );
};
export default Tag;

export const TagWrapper = styled.div`
  cursor: pointer;
`;

const TagContainer = styled.div<TagProps>`
  box-sizing: border-box;
  padding: 4px 8px;

  position: relative;
  background-color: ${(props) => themeColors[props.theme].background};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.description && `cursor: pointer;`}
`;

const TagTitle = styled.div<TagProps>`
  color: ${(props) => themeColors[props.theme].text};

  font-size: 12px;
  white-space: ${(props) => (props.wrap == true ? "pre-wrap" : "nowrap")};
`;
