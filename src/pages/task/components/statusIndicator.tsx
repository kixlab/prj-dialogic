import { colors } from "@/styles/colors";
import styled from "styled-components";

import DoneIcon from "@/assets/check.svg";
import OngoingIcon from "@/assets/round.svg";

interface StatusIndicatorProps {
  status: "pending" | "onGoing" | "done";
}

const StatusIndicator = (props: StatusIndicatorProps) => {
  return (
    <StatusIndicatorWrapper {...props}>
      {props.status == "onGoing" && (
        <img src={OngoingIcon} style={{ width: "10px", height: "10px" }} />
      )}
      {props.status == "done" && (
        <img src={DoneIcon} style={{ width: "12px", height: "9px" }} />
      )}
    </StatusIndicatorWrapper>
  );
};

export default StatusIndicator;

const StatusIndicatorWrapper = styled.div<StatusIndicatorProps>`
  width: 20px;
  height: 20px;

  background-color: ${(props) =>
    colors[
      props.status == "pending"
        ? "gray100"
        : props.status == "onGoing"
        ? "green200"
        : "orange100"
    ]};
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
