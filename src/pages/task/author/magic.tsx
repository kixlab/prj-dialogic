/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/states/state";
import { colors } from "@/styles/colors";
import { BoldText, RegularText } from "@/styles/text";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FeatureButton from "../components/featureButton";
import { BiCheck, BiSolidMagicWand } from "react-icons/bi";
import { LuMousePointer2 } from "react-icons/lu";
import { dialogueToData, getTargetNum, levelToData } from "./utils";
import { IconContext } from "react-icons";
import { useState } from "react";
import { getVariation } from "@/apis/lab";

const Magic = () => {
  const targets: number[] = useSelector(
    (state: RootState) => state.userData.targets
  );
  const level = useSelector((state: RootState) => state.dialogue.level);
  const scenario = useSelector((state: RootState) => state.dialogue.scenario);
  const dialogue = useSelector((state: RootState) => state.dialogue.dialogue);

  const [option, setOption] = useState<boolean>(false);

  const onMagic = async () => {
    const { wholeUttr, targetUttr } = dialogueToData(dialogue, targets);

    const data: any = {
      dialogue: wholeUttr,
      understanding_state: levelToData(level),
      org_uttrs: targetUttr,
      teaching_scenario: scenario,
      preserve_pattern: option,
    };

    const result = await getVariation(data);
    console.log(result);
  };

  return (
    <MagicWrapper>
      <MagicTopWrapper>
        <MagicTitleWrapper>
          <MagicInputWrapper>
            <MagicTextWrapper>
              <BoldText text="Target" color="gray400" size={15} />
            </MagicTextWrapper>
            <FeatureButton
              text={`${getTargetNum(targets)} selected`}
              disable={true}
            >
              <LuMousePointer2 />
            </FeatureButton>
          </MagicInputWrapper>
          <MagicInputWrapper>
            <MagicTextWrapper>
              <BoldText text="Option" color="gray400" size={15} />
            </MagicTextWrapper>
            <MagicOptionWrapper>
              <OptionContainer
                option={option}
                onClick={() => setOption((prev) => !prev)}
              >
                <IconContext.Provider
                  value={{
                    color: colors[option ? "white" : "gray300"],
                    style: { height: "20px" },
                  }}
                >
                  <BiCheck />
                </IconContext.Provider>

                <RegularText
                  text="Perserve the origin utterance pattern"
                  color={option ? "white" : "gray300"}
                  size={13}
                />
              </OptionContainer>
            </MagicOptionWrapper>
          </MagicInputWrapper>
        </MagicTitleWrapper>
        <FeatureButton
          text="Magic"
          disable={targets.length == 0 || targets[0] == -1}
          onClick={onMagic}
        >
          <BiSolidMagicWand />
        </FeatureButton>
      </MagicTopWrapper>
      <MagicDivider />
    </MagicWrapper>
  );
};
export default Magic;

const MagicWrapper = styled.div`
  flex: 1;
  height: fit-content;

  box-sizing: border-box;
  padding: 25px 25px 30px 25px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
`;

const MagicTitleWrapper = styled.div`
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  gap: 10px;
`;

const MagicTextWrapper = styled.div`
  width: 45px;
`;

const MagicInputWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 20px;
`;

const MagicTopWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

const MagicDivider = styled.div`
  width: 100%;

  position: relative;
  top: 1px;
  border-top: 1px solid ${colors["gray200"]};
`;

const MagicOptionWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  gap: 5px;
`;

const OptionContainer = styled.div<{ option: boolean }>`
  width: fit-content;
  height: 35px;

  box-sizing: border-box;
  padding: 0px 15px 0px 10px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  border: 1px solid ${(props) => colors[props.option ? "orange100" : "gray200"]};

  ${(props) => props.option && `background-color: ${colors["orange100"]};`}

  cursor: pointer;
`;
