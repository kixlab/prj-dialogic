import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "@/states/state";

const Header = () => {
  const phase: number = useSelector((state: RootState) => state.phase.phase);

  return <HeaderWrapper>Header {phase}</HeaderWrapper>;
};
export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 80px;
  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
