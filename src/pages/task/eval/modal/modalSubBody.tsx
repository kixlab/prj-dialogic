import { colors } from "@/styles/colors";
import { IconContext } from "react-icons";
import { BiX } from "react-icons/bi";
import styled from "styled-components";
import ModalSubBodyInfo from "./modalSubBodyInfo";

interface ModalSubBodyProps {
  onClick: () => void;
}

const ModalSubBody = (props: ModalSubBodyProps) => {
  return (
    <ModalSubBodyWrapper>
      <ModalSubHeaderWrapper>
        <ModalIconWrapper onClick={props.onClick}>
          <IconContext.Provider
            value={{
              color: colors["gray400"],
              style: { width: "18px", height: "auto" },
            }}
          >
            <BiX />
          </IconContext.Provider>
        </ModalIconWrapper>
      </ModalSubHeaderWrapper>
      <ModalSubBodyInfo />
    </ModalSubBodyWrapper>
  );
};
export default ModalSubBody;

const ModalSubBodyWrapper = styled.div`
  width: 350px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ModalSubHeaderWrapper = styled.div`
  width: 100%;
  height: fit-content;

  box-sizing: border-box;
  padding: 15px 15px 5px 15px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ModalIconWrapper = styled.div`
  width: 30px;
  height: 30px;

  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${colors["gray100"]};
  }
  cursor: pointer;
`;
