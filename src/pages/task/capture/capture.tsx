import { useEffect, useState } from "react";

import styled from "styled-components";
import { colors } from "@/styles/colors";
import { UtteranceItem } from "@/states/types";

import { v4 as uuid } from "uuid";
import { BoldText } from "@/styles/text";
import CaptureItem from "./captureItem";
import { useNavigate } from "react-router-dom";

const Capture = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>("");
  const [dialogue, setDialogue] = useState<UtteranceItem[]>([]);
  const [size, setSize] = useState<string>("");
  const [ko, setKo] = useState(true);

  const stringToDialogue = (target: string): UtteranceItem[] => {
    const result: UtteranceItem[] = [];
    try {
      const speakers = new Set<string>();
      target.split("* ").forEach((el, idx) => {
        if (idx == 0) return;
        speakers.add(el.split("[")[0]);
      });
      const speakerNames = Array.from(speakers);

      target.split("* ").forEach((el, idx) => {
        if (idx == 0) return;

        const speakerName = el.split("[")[0];
        const utterance = el.split(">")[1];

        result.push({
          id: uuid(),
          speaker: speakerNames.findIndex((name) => name == speakerName),
          utterance,
        });
      });

      return result;
    } catch (err) {
      alert("parsing failed");
      setInput("");
      setDialogue([]);

      return result;
    }
  };

  useEffect(() => {
    setDialogue(stringToDialogue(input));
  }, [input, ko]);

  return (
    <CaptureWrapper>
      <button onClick={() => navigate("/")}>홈으로</button>
      <button onClick={() => setKo((prev) => !prev)}>
        {ko ? "한국어" : "영어"}
      </button>
      <input
        placeholder="사이즈 조절 (기본 800)"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <input
        placeholder="대화 복붙자리"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <DialogueWrapper size={size}>
        {dialogue.map((item) => (
          <CaptureItem key={item.id} {...item} ko={ko} />
        ))}
      </DialogueWrapper>
    </CaptureWrapper>
  );
};

export default Capture;

const CaptureWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;
`;

const DialogueWrapper = styled.div<{ size: string }>`
  width: 800px;
  width: ${(props) => props.size + "px"};
  height: fit-content;

  box-sizing: border-box;
  padding: 18px 20px 18px 18px;
  border: 1px solid ${colors["gray200"]};

  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: stretch;

  gap: 16px;
`;
