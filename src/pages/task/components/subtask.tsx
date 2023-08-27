import { colors } from "@/styles/colors";
import { BoldText, RegularText } from "@/styles/text";
import { ReactNode } from "react";
import styled from "styled-components";
import StatusIndicator from "./statusIndicator";
import { transition } from "@/styles/animation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { initTask } from "@/states/phaseSlice";

interface SubTaskProps {
  type: "short" | "long";
  title: string;
  subtitle: string;
  status: "pending" | "onGoing" | "done";
  onNext: () => void;
  children: ReactNode;
}

const SubTask = (props: SubTaskProps) => {
  return (
    <SubTaskWrapper>
      <SubTaskContainer type={props.type} status={props.status}>
        <StatusIndicator status={props.status} />
        <SubTaskBodyWrapper>
          <SubTaskTitle {...props} />
          {props.status == "onGoing" && props.children}
          {props.status == "onGoing" && <SubTaskButton {...props} />}
        </SubTaskBodyWrapper>
      </SubTaskContainer>
      <SubTaskConnector />
    </SubTaskWrapper>
  );
};
export default SubTask;

const SubTaskWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubTaskConnector = styled.div`
  height: 25px;

  position: relative;
  left: 2px;
  border-left: 2px dotted ${colors["gray200"]};
`;

const SubTaskContainer = styled.div<{
  type: "short" | "long";
  status: "pending" | "onGoing" | "done";
}>`
  width: ${(props) => (props.type == "short" ? "880px" : "1225px")};
  height: fit-content;

  box-sizing: border-box;
  padding: 18px 20px 18px 18px;
  border: 1px solid ${colors["gray200"]};
  ${(props) =>
    props.status === "onGoing" && `background-color: ${colors["white"]};`}
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const SubTaskBodyWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SubTaskTitle = (props: SubTaskProps) => {
  return (
    <SubTaskTitleWrapper>
      {props.status == "onGoing" ? (
        <BoldText text={props.title} color="black" size={17} />
      ) : (
        <RegularText text={props.title} color="black" size={17} />
      )}
      {props.status == "onGoing" && (
        <RegularText text={props.subtitle} color="gray400" size={15} />
      )}
    </SubTaskTitleWrapper>
  );
};
const SubTaskTitleWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const SubTaskButton = (props: SubTaskProps) => {
  const dispatch = useDispatch();
  const next = useSelector((state: RootState) => state.phase.next);

  const onNext = () => {
    if (next) {
      dispatch(initTask());
      props.onNext();
    }
  };

  return (
    <SubTaskButtonWrapper onClick={onNext} next={next}>
      <BoldText text="Next" color={next ? "green400" : "gray100"} size={14} />
    </SubTaskButtonWrapper>
  );
};

const SubTaskButtonWrapper = styled.div<{ next: boolean }>`
  width: 110px;
  height: 32px;

  background-color: ${colors["gray50"]};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  ${(props) =>
    props.next &&
    `
    background-color: ${colors["green50"]};
    &:hover {
      background-color: ${colors["green100"]};
    }
    cursor: pointer;

  `}
  ${transition}
`;
