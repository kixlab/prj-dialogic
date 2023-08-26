import { RootState } from "@/states/state";
import { colors } from "@/styles/colors";
import { BoldText } from "@/styles/text";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Transcript = () => {
  const transcript = useSelector((state: RootState) => state.userData.script);
  const description = useSelector((state: RootState) => state.data.description);

  return (
    <TranscriptWrapper>
      <BoldText text={description} size={15} color="gray400" />
      <TranscriptContainer>{transcript}</TranscriptContainer>
    </TranscriptWrapper>
  );
};
export default Transcript;

const TranscriptWrapper = styled.div`
  flex: 0.8;
  height: fit-content;

  box-sizing: border-box;
  padding: 30px 25px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

const TranscriptContainer = styled.div`
  width: 100%;

  box-sizing: border-box;
  padding: 12px 18px;
  background-color: ${colors["gray50"]};
  color: ${colors["gray400"]};
  border-radius: 5px;

  font-weight: medium;
  font-size: 15px;
  line-height: 1.6;
`;
