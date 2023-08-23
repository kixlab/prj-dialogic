import { ReactNode } from "react";
import styled from "styled-components";

interface TaskContainerProps {
  children: ReactNode;
  gap: number;
  padding: boolean;
  align: "start" | "end";
}

const TaskContainer = (props: TaskContainerProps) => {
  return (
    <TaskContainerWrapper {...props}>{props.children}</TaskContainerWrapper>
  );
};
export default TaskContainer;

const TaskContainerWrapper = styled.div<TaskContainerProps>`
  justify-items: stretch;
  height: fit-content;

  box-sizing: border-box;
  ${(props) => props.padding && `padding-right: 15px;`}

  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.align == "start" ? "flex-start" : "flex-end"};
  gap: ${(props) => `${props.gap}px`};
`;
