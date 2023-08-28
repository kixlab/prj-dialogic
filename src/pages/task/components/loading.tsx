import { colors } from "@/styles/colors";
import { GridLoader } from "react-spinners";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoaderWrapper>
      <GridLoader color={colors["gray300"]} size={9} />
    </LoaderWrapper>
  );
};
export default Loading;

const LoaderWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 30px;
  background-color: ${colors["gray50"]};
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
