import { colors } from "@/styles/colors";
import styled from "styled-components";
import TaskContainer from "../components/taskContainer";

const AuthorDownload = () => {
  return (
    <TaskContainer gap={10} padding={true} align="end">
      <AuthorDownloadWrapper></AuthorDownloadWrapper>
    </TaskContainer>
  );
};
export default AuthorDownload;

const AuthorDownloadWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 25px 20px;
  border: 1px solid ${colors["gray200"]};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
