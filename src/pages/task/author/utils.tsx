import { LevelInfo, UtteranceItem } from "@/states/types";

export const getTargetNum = (targets: number[]): number => {
  if (targets.length == 0 || targets[0] == -1) return 0;
  else return targets[1] - targets[0] + 1;
};

export const isTarget = (targets: number[], idx: number) => {
  if (targets.length == 0 || targets[0] == -1) return false;

  if (targets[0] <= idx && idx <= targets[1]) return true;
  return false;
};

// export interface LevelInfo {
//   title: string;
//   level: number;
//   subtitle: string;
// }

export const levelToData = (level: LevelInfo[]) => {
  const result = [];
  level.forEach((el) => {
    result.push(["CONCEPT: " + el.title, "LEVEL: " + el.level, el.subtitle]);
  });
};

const utterItemToString = (item: UtteranceItem) => {
  let speaker = "Tutee";
  if (item.speaker == 0) speaker = "Tutor";
  else speaker += item.speaker.toString();

  return speaker + " : " + item.utterance + "\n";
};

export const dialogueToData = (
  dialogue: UtteranceItem[],
  targets: number[]
) => {
  let wholeUttr = "";
  let targetUttr = "";
  let blank = false;

  dialogue.forEach((item, idx) => {
    if (targets[0] <= idx && idx <= targets[1]) {
      if (!blank) {
        wholeUttr += "[BLANK]\n";
        blank = true;
      }
      targetUttr += utterItemToString(item);
    } else {
      wholeUttr += utterItemToString(item);
    }
  });
  return { wholeUttr, targetUttr };
};
