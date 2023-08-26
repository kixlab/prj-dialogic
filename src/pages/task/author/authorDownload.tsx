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
import { useRef } from "react";

const AuthorDownload = () => {
  const title = useSelector((state: RootState) => state.dialogue.title);
  const description = useSelector((state: RootState) => state.data.description);
  const printRef = useRef(null);

  return (
    <TaskContainer gap={10} padding={true} align="start">
      <ReactToPrint
        trigger={() => (
          <FeatureButton text="Download">
            <RiFileDownloadLine />
          </FeatureButton>
        )}
        content={() => printRef.current}
      />

      <AuthorDownloadWrapper ref={printRef}>
        <AuthorTitleWrapper>
          <AuthorDescriptionWrapper>
            <RegularText text="Dialogic-Lecture" color="gray350" size={12} />
            <RegularText
              text={description == null ? "Sample Description" : description}
              color="gray350"
              size={12}
            />
          </AuthorDescriptionWrapper>
          <BoldText text={title} color="black" size={20} />
        </AuthorTitleWrapper>
        <DialogueViewer />
      </AuthorDownloadWrapper>
    </TaskContainer>
  );
};
export default AuthorDownload;

const AuthorDownloadWrapper = styled.div`
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
