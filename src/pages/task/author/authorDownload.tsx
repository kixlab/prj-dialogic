import { colors } from "@/styles/colors";
import styled from "styled-components";
import TaskContainer from "../components/taskContainer";
import DialogueViewer from "../components/dialogueViewer";

const AuthorDownload = () => {
  return (
    <TaskContainer gap={10} padding={true} align="end">
      <AuthorDownloadWrapper>
        <AuthorTitle value="Alice explains photosynthesis herself" />
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
  padding: 25px 25px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const AuthorTitle = styled.input`
  width: 40%;

  box-sizing: border-box;
  padding-bottom: 6px;
  outline: none;
  border: none;
  border-bottom: 2px solid ${colors["green100"]};

  font-size: 20px;
  font-weight: 700;
`;
