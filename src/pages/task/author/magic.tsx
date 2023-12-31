/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/states/state";
import { colors } from "@/styles/colors";
import { BoldText, RegularText } from "@/styles/text";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FeatureButton from "../components/featureButton";
import { BiCheck, BiCommentDots, BiVial } from "react-icons/bi";
import { LuMousePointer2 } from "react-icons/lu";
import { dialogueToData, getTargetNum, levelToData, varToState } from "./utils";
import { IconContext } from "react-icons";
import { useState } from "react";
import { getVariation } from "@/apis/lab";
import { UtteranceItem, VariationItem } from "@/states/types";
import MagicItem from "./magicItem";
import { useDispatch } from "react-redux";
import { initMagicItem, updateMagicItem } from "@/states/dataSlice";
import { replaceUtterance } from "@/states/dialogueSlice";
import Loading from "../components/loading";
import { updateLoading } from "@/states/phaseSlice";
import { v4 as uuid } from "uuid";
import { text } from "@/states/constant";

const Magic = () => {
  const targets: number[] = useSelector(
    (state: RootState) => state.userData.targets
  );
  const [magic, setMagic] = useState<VariationItem[][]>([]);
  const dispatch = useDispatch();

  const loading = useSelector((state: RootState) => state.phase.loading);
  const magicItem = useSelector((state: RootState) => state.data.magicItem);
  const level = useSelector((state: RootState) => state.dialogue.level);
  const scenario = useSelector((state: RootState) => state.dialogue.scenario);
  const dialogue = useSelector((state: RootState) => state.dialogue.dialogue);

  const [option, setOption] = useState<boolean>(false);

  const applyMagic = () => {
    if (magicItem == null) return;

    const newDialogue: UtteranceItem[] = magic[magicItem].map((el) => ({
      id: uuid(),
      speaker: el.speaker,
      utterance: el.utterance,
    }));

    dispatch(replaceUtterance({ targets, dialogue: newDialogue }));

    dispatch(initMagicItem());
    setMagic([]);
  };

  const onMagic = async () => {
    dispatch(updateLoading(true));
    setMagic([]);
    const { wholeUttr, targetUttr } = dialogueToData(dialogue, targets);

    const data: any = {
      dialogue: wholeUttr,
      understanding_state: levelToData(level),
      org_uttrs: targetUttr,
      teaching_scenario: scenario,
      preserve_pattern: option,
    };
    setMagic(varToState(await getVariation(data)));
    dispatch(updateLoading(false));
  };

  return (
    <MagicWrapper>
      <MagicTopWrapper>
        <MagicTitleWrapper>
          <MagicInputWrapper>
            <MagicTextWrapper>
              <BoldText
                text={text.phase_3.task_1.button_4.title}
                color="gray400"
                size={15}
              />
            </MagicTextWrapper>
            <FeatureButton
              text={`${getTargetNum(targets)} ${
                text.phase_3.task_1.button_4.description
              }`}
              disable={true}
            >
              <LuMousePointer2 />
            </FeatureButton>
          </MagicInputWrapper>
          <MagicInputWrapper>
            <MagicTextWrapper>
              <BoldText
                text={text.phase_3.task_1.button_5.title}
                color="gray400"
                size={15}
              />
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
                  text={text.phase_3.task_1.button_5.description}
                  color={option ? "white" : "gray300"}
                  size={13}
                />
              </OptionContainer>
            </MagicOptionWrapper>
          </MagicInputWrapper>
        </MagicTitleWrapper>
        <FeatureButton
          text={text.phase_3.task_1.button_2}
          disable={targets.length == 0 || targets[0] == -1 || loading == true}
          onClick={onMagic}
        >
          <BiVial />
        </FeatureButton>
      </MagicTopWrapper>
      <MagicDivider />
      {loading && <Loading />}
      <MagicItemWrapper>
        {magic.map((el, idx) => (
          <MagicItem
            key={idx}
            data={el}
            onClick={() => {
              dispatch(updateMagicItem(idx));
            }}
            active={magicItem === idx}
          />
        ))}
        <FeatureButton
          text={text.phase_3.task_1.button_6}
          onClick={applyMagic}
          disable={magicItem == null}
        >
          <BiCommentDots />
        </FeatureButton>
      </MagicItemWrapper>
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
const MagicItemWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 15px;
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
  width: 60px;
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

  ${(props) => props.option && `background-color: ${colors["orange150"]};`}

  cursor: pointer;
`;
