import { VariationItem } from "@/states/types";
import { BoldText } from "@/styles/text";
import styled from "styled-components";
import { getSpeakerName } from "../utils";
import Tag from "../components/tag";
import { colors } from "@/styles/colors";

interface MagicItemProps {
  active: boolean;
  data: VariationItem[];
  onClick: () => void;
}

const MagicItem = (props: MagicItemProps) => {
  return (
    <MagicItemWrapper onClick={props.onClick} active={props.active}>
      {props.data.map((el) => (
        <MagicItemUnit {...el} />
      ))}
    </MagicItemWrapper>
  );
};
export default MagicItem;

const MagicItemWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 15px 10px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  &:hover {
    ${(props) => !props.active && `border: 1px solid ${colors["orange50"]};`}
  }
  ${(props) => props.active && `border: 1px solid ${colors["orange100"]};`}

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  cursor: pointer;
`;

const MagicItemUnit = (props: VariationItem) => {
  return (
    <MagicItemUnitWrapper>
      <MagicItemTitleWrapper>
        <BoldText
          text={getSpeakerName(props.speaker)}
          color={"gray400"}
          size={13}
        />
        <Tag
          title={props.category}
          theme={props.speaker == 0 ? "blue" : "pink"}
          wrap={true}
        />
      </MagicItemTitleWrapper>
      <MagicItemTextWrapper>{props.utterance} </MagicItemTextWrapper>
    </MagicItemUnitWrapper>
  );
};
const MagicItemUnitWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  gap: 15px;
`;
const MagicItemTitleWrapper = styled.div`
  width: 80px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 5px;
`;

const MagicItemTextWrapper = styled.div`
  flex: 1;
  height: fit-content;

  font-size: 14px;
  color: ${colors["gray400"]};
  line-height: 1.4;
`;
