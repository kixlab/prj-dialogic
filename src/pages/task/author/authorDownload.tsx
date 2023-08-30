import { useSelector } from "react-redux";
import { RootState } from "@/states/state";
import { colors } from "@/styles/colors";
import styled from "styled-components";
import ReactToPrint from "react-to-print";

import TaskContainer from "../components/taskContainer";
import DialogueViewer from "../components/dialogueViewer";
import { BoldText, RegularText } from "@/styles/text";

import FeatureButton from "../components/featureButton";

import { RiFileDownloadLine } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { doneTask } from "@/states/phaseSlice";
import { text } from "@/states/constant";
import { addMarks } from "../gen/utils";

const AuthorDownload = () => {
  const base = useSelector((state: RootState) => state.phase.base);

  const script = useSelector((state: RootState) => state.userData.script);
  const selections = useSelector(
    (state: RootState) => state.userData.selections
  );
  const reasons = useSelector((state: RootState) => state.userData.reasons);

  const title = useSelector((state: RootState) => state.dialogue.title);

  const description = useSelector((state: RootState) => state.data.description);
  const dispatch = useDispatch();
  const printRef = useRef(null);

  useEffect(() => {
    dispatch(doneTask());

    const container = document.getElementById("authorScriptContainer");
    if (!container || !script) return;
    container.innerHTML = addMarks(script, selections);
  }, []);

  return (
    <TaskContainer gap={15} padding={true} align="start">
      <ReactToPrint
        trigger={() => (
          <FeatureButton text={text.phase_3.task_2.button_1}>
            <RiFileDownloadLine />
          </FeatureButton>
        )}
        content={() => printRef.current}
      />

      <AuthorDownloadWrapper ref={printRef}>
        <AuthorDialogueWrapper>
          <AuthorTitleWrapper>
            <AuthorDescriptionWrapper>
              <RegularText
                text={base ? "Duco-A" : "Duco-B"}
                color="gray350"
                size={12}
              />
              <RegularText
                text={description == null ? "Sample Description" : description}
                color="gray350"
                size={12}
              />
            </AuthorDescriptionWrapper>
            <BoldText text={title} color="black" size={20} />
          </AuthorTitleWrapper>
          <DialogueViewer />
        </AuthorDialogueWrapper>

        <AuthorDialogueWrapper>
          <AuthorInfoWrapper>
            <AuthorScriptContainer id="authorScriptContainer" />
            <AuthorTableWrapper>
              <AuthorTableContainer>
                <tr>
                  <AuthorTableHeader last={base}>
                    {text.phase_2.task_1.button_3.title}
                  </AuthorTableHeader>
                  <AuthorTableData last={base}>{reasons[0]}</AuthorTableData>
                </tr>
                {!base && (
                  <tr>
                    <AuthorTableHeader last={true}>
                      {text.phase_2.task_1.button_4.title}
                    </AuthorTableHeader>
                    <AuthorTableData last={true}>{reasons[1]}</AuthorTableData>
                  </tr>
                )}
              </AuthorTableContainer>
            </AuthorTableWrapper>
          </AuthorInfoWrapper>
        </AuthorDialogueWrapper>
      </AuthorDownloadWrapper>
    </TaskContainer>
  );
};
export default AuthorDownload;

const AuthorDownloadWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
`;

const AuthorDialogueWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 22px 25px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
const AuthorDescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AuthorTitleWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  gap: 4px;
`;

const AuthorInfoWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  gap: 10px;
`;

const AuthorScriptContainer = styled.div`
  flex: 1.5;

  box-sizing: border-box;
  padding: 12px 18px;
  background-color: ${colors["gray50"]};
  color: ${colors["gray400"]};
  border-radius: 5px;

  font-weight: medium;
  font-size: 15px;
  line-height: 1.6;
`;

const AuthorTableWrapper = styled.div`
  flex: 1;

  box-sizing: border-box;
  border: 1px solid ${colors["gray200"]};
  border-radius: 5px;
`;

const AuthorTableContainer = styled.table`
  width: 100%;
  overflow: scroll;

  border: 0px;
  outline: 0px;
  border-collapse: collapse;
`;

const AuthorTableHeader = styled.th<{ last: boolean }>`
  width: 150px;

  box-sizing: border-box;
  padding: 15px 20px;
  ${(props) => !props.last && `border-bottom: 1px solid ${colors["gray200"]};`}

  font-size: 14px;
  font-weight: 700;
  text-align: center;

  background-color: ${colors["gray100"]};
`;

const AuthorTableData = styled.td<{ last: boolean }>`
  box-sizing: border-box;
  padding: 15px 20px;
  border-left: 1px solid ${colors["gray200"]};
  ${(props) => !props.last && `border-bottom: 1px solid ${colors["gray200"]};`}

  font-size: 14px;
  font-weight: 400;
`;
