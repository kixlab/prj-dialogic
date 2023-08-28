import { LevelInfo, UtteranceItem, VariationItem } from "@/states/types";

export const varToState = (variations: string[]): VariationItem[][] => {
  const result: VariationItem[][] = [];

  variations.forEach((el) => {
    const variation: VariationItem[] = [];
    el.split("\n").forEach((uttr) => {
      let speaker = 0;
      const speakerName = uttr.includes("[")
        ? uttr.split(" [")[0]
        : uttr.split(" :")[0];
      if (speakerName.includes("Tutor")) speaker = 0;
      else if (speakerName.includes("Tutee")) {
        const tuteeNum = speakerName.split("Tutee")[1];
        if (isNaN(parseInt(tuteeNum))) speaker = 1;
        else speaker = parseInt(tuteeNum);
      } else speaker = 1;

      const category = uttr.includes("[")
        ? uttr.split("[")[1].split("]")[0]
        : "";
      const utterance = uttr.split(": ")[1];
      variation.push({ speaker, category, utterance });
    });
    result.push(variation);
  });

  return result;
};

export const getTargetNum = (targets: number[]): number => {
  if (targets.length == 0 || targets[0] == -1) return 0;
  else return targets[1] - targets[0] + 1;
};

export const isTarget = (targets: number[], idx: number) => {
  if (targets.length == 0 || targets[0] == -1) return false;

  if (targets[0] <= idx && idx <= targets[1]) return true;
  return false;
};

export const levelToData = (level: LevelInfo[]): string[][] => {
  const result: string[][] = [];
  level.forEach((el) => {
    result.push(["CONCEPT: " + el.title, "LEVEL: " + el.level, el.subtitle]);
  });
  return result;
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
