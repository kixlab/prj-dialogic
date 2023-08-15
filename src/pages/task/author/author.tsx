import styled from "styled-components";

const Author = () => {
  return <AuthorLayout>This is author task</AuthorLayout>;
};

export default Author;

const AuthorLayout = styled.div`
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background-color: lightgray;
`;
