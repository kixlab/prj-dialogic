import { LevelInfo, UtteranceItem, VariationItem } from "@/states/types";

export const varDummy = [
  "Tutee [Answering]: Water is an example of a compound because it’s made up of two different elements, Hydrogen and Oxygen.\nTutor [Scaffolding]: Exactly, Emily! Water (H2O) is a great example of a compound because it contains two different elements - Hydrogen and Oxygen. Now let’s try to distinguish it further. Can you tell me whether Helium gas (He) is a compound, a molecule, or neither?\nTutee [Answering]: Helium gas (He) is not a compound because it’s composed of a single element.",
  "Tutee [Answering]: Water is an example of a compound because it’s made up of two different elements, Hydrogen and Oxygen.\nTutor [Scaffolding]: Exactly, Emily! Water (H2O) is a great example of a compound because it contains two different elements - Hydrogen and Oxygen. Now let’s try to distinguish it further. Can you tell me whether Helium gas (He) is a compound, a molecule, or neither?\nTutee [Answering]: Helium gas (He) is not a compound because it’s composed of a single element.",
  "Tutee [Answering]: Water is an example of a compound because it’s made up of two different elements, Hydrogen and Oxygen.\nTutor [Scaffolding]: Exactly, Emily! Water (H2O) is a great example of a compound because it contains two different elements - Hydrogen and Oxygen. Now let’s try to distinguish it further. Can you tell me whether Helium gas (He) is a compound, a molecule, or neither?\nTutee [Answering]: Helium gas (He) is not a compound because it’s composed of a single element.",
  "Tutee [Answering]: Water is an example of a compound because it’s made up of two different elements, Hydrogen and Oxygen.\nTutor [Scaffolding]: Exactly, Emily! Water (H2O) is a great example of a compound because it contains two different elements - Hydrogen and Oxygen. Now let’s try to distinguish it further. Can you tell me whether Helium gas (He) is a compound, a molecule, or neither?\nTutee [Answering]: Helium gas (He) is not a compound because it’s composed of a single element.",
];

export const varToState = (variations: string[]): VariationItem[][] => {
  const result: VariationItem[][] = [];

  variations.forEach((el) => {
    const variation: VariationItem[] = [];
    el.split("\n").forEach((uttr) => {
      let speaker = 0;
      const speakerName = uttr.split(" [")[0];
      if (speakerName.includes("Tutor")) speaker = 0;
      else if (speakerName.includes("Tutee")) {
        const tuteeNum = speakerName.split("Tutee")[1];
        if (isNaN(parseInt(tuteeNum))) speaker = 1;
        else speaker = parseInt(tuteeNum);
      } else speaker = 1;

      const category = uttr.split("[")[1].split("]")[0];
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
