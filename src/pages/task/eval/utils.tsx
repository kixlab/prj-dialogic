import { LevelInfo, PatternInfo, UtteranceItem } from "@/states/types";
import { v4 as uuid } from "uuid";

export const rubricToState = (rubric: string) => {
  const parse = rubric.split(">> ");
  const result: { concept: string; level: string[] }[] = [];
  parse.splice(0, 1); // remove instruction

  parse.forEach((el) => {
    const concept = el.split("[")[1].split("]")[0];

    const level = [];
    for (let i = 0; i < 3; i++)
      level.push(el.split("> ")[i + 1].split("\n")[0]);

    level.push(el.split("> ")[4]);

    result.push({ concept, level });
  });
  return result;
};

export const levelToState = (level: string[][]): LevelInfo[] => {
  const result: LevelInfo[] = [];
  level.forEach((el) => {
    result.push({
      title: el[0].split(": ")[1],
      level: parseInt(el[1].split(": ")[1]),
      subtitle: el[2],
    });
  });
  return result;
};

export const uttrToState = (uttr: string[][], pattern: number[][]) => {
  const patternInfo: PatternInfo[] = [];
  pattern.forEach((el) => {
    const title = uttr[el[0]][1] + "->" + uttr[el[1]][1];
    patternInfo.push({
      title,
      start: el[0],
      end: el[1],
    });
  });
  const speakers = new Set<string>();
  const dialogue: UtteranceItem[] = [];
  uttr.forEach((el) => {
    speakers.add(el[0]);
  });
  const speakerNames = Array.from(speakers);
  uttr.forEach((el) => {
    dialogue.push({
      id: uuid(),
      speaker: speakerNames.findIndex((name) => name == el[0]),
      utterance: el[2],
    });
  });
  return { pattern: patternInfo, speaker: speakerNames.length, dialogue };
};

export interface LevelInfoProps {
  title: string;
  level: number;
  subtitle: string;
}
