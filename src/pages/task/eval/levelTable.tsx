import { RootState } from "@/states/state";
import { useSelector } from "react-redux";
import { rubricToState } from "./utils";
import styled from "styled-components";
import { colors } from "@/styles/colors";
import { text } from "@/states/constant";

const LevelTable = () => {
  const rubric = useSelector((state: RootState) => state.userData.rubric);

  return (
    <LevelTableWrapper>
      <LevelTableContainer>
        <tr>
          <LevelTableHeader last={false}>
            {text.phase_2.task_2.card_3}
          </LevelTableHeader>
          {rubric !== null &&
            rubricToState(rubric).map((el) => (
              <LevelTableKeyData last={false}>{el.concept}</LevelTableKeyData>
            ))}
        </tr>
        <tr>
          <LevelTableHeader
            last={false}
          >{`${text.phase_2.task_2.card_2} 1`}</LevelTableHeader>
          {rubric !== null &&
            rubricToState(rubric).map((el) => (
              <LevelTableData last={false}>{el.level[0]}</LevelTableData>
            ))}
        </tr>
        <tr>
          <LevelTableHeader
            last={false}
          >{`${text.phase_2.task_2.card_2} 2`}</LevelTableHeader>
          {rubric !== null &&
            rubricToState(rubric).map((el) => (
              <LevelTableData last={false}>{el.level[1]}</LevelTableData>
            ))}
        </tr>
        <tr>
          <LevelTableHeader
            last={false}
          >{`${text.phase_2.task_2.card_2} 3`}</LevelTableHeader>
          {rubric !== null &&
            rubricToState(rubric).map((el) => (
              <LevelTableData last={false}>{el.level[2]}</LevelTableData>
            ))}
        </tr>
        <tr>
          <LevelTableHeader
            last={true}
          >{`${text.phase_2.task_2.card_2} 4`}</LevelTableHeader>
          {rubric !== null &&
            rubricToState(rubric).map((el) => (
              <LevelTableData last={true}>{el.level[3]}</LevelTableData>
            ))}
        </tr>
      </LevelTableContainer>
    </LevelTableWrapper>
  );
};
export default LevelTable;

const LevelTableWrapper = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors["gray200"]};
  border-radius: 5px;
`;

const LevelTableContainer = styled.table`
  width: 100%;
  overflow: scroll;

  border: 0px;
  outline: 0px;
  border-collapse: collapse;
`;

const LevelTableHeader = styled.th<{ last: boolean }>`
  width: 100px;

  box-sizing: border-box;
  padding: 15px 20px;
  ${(props) => !props.last && `border-bottom: 1px solid ${colors["gray200"]};`}

  font-size: 14px;
  font-weight: 700;
  text-align: center;

  background-color: ${colors["gray100"]};
`;

const LevelTableData = styled.td<{ last: boolean }>`
  box-sizing: border-box;
  padding: 15px 20px;
  border-left: 1px solid ${colors["gray200"]};
  ${(props) => !props.last && `border-bottom: 1px solid ${colors["gray200"]};`}

  font-size: 14px;
  font-weight: 400;
`;

const LevelTableKeyData = styled.td<{ last: boolean }>`
  box-sizing: border-box;
  padding: 15px 20px;
  border-left: 1px solid ${colors["gray200"]};
  ${(props) => !props.last && `border-bottom: 1px solid ${colors["gray200"]};`}

  font-size: 14px;
  font-weight: 700;
  text-align: center;
`;
