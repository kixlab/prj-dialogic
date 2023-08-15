import styled from "styled-components";

const Gen = () => {
  return <GenLayout>This is Gen task</GenLayout>;
};

export default Gen;

const GenLayout = styled.div`
  width: 100%;
  min-height: 100%;
  height: fit-content;
  background-color: lightgray;
`;
