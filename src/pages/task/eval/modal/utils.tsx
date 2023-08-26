import { LevelInfo, PatternInfo, UtteranceItem } from "@/states/types";
import { v4 as uuid } from "uuid";

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

const sampleData = {
  is_same_scenario: true,
  learning_objective:
    "The goal of this conversation is to help the student, Emily, understand the concept of compounds and molecules and their differences. By the end of the interaction, she should be able to confidently distinguish between molecules and compounds, as well as provide and explain examples of both.",
  patterns: [
    [2, 3],
    [3, 4],
  ],
  teaching_scenario:
    "The tutor uses cognitive conflict by challenging Emily's understanding with examples and follows through with metacognitive prompting by encouraging her to articulate her thought process. The tutor also uses cognitive prompting to draw on Emily's prior knowledge.",
  understanding_states: [
    [
      "CONCEPT: Compounds",
      "LEVEL: 2",
      "Emily is able to identify and differentiate between compounds and molecules, but has trouble recognizing examples and explaining why they are considered compounds.",
    ],
    [
      "CONCEPT: Molecules",
      "LEVEL: 1",
      "Emily can define a molecule but is not able to confidently differentiate it from a compound or provide examples of molecules.",
    ],
    [
      "CONCEPT: Molecules",
      "LEVEL: 1",
      "Emily can define a molecule but is not able to confidently differentiate it from a compound or provide examples of molecules.",
    ],
    [
      "CONCEPT: Difference between compounds and molecules",
      "LEVEL: 1",
      "Emily can define both compounds and molecules and attempts to separate them conceptually, but struggles to accurately state their differences and apply these concepts to real examples.",
    ],
  ],
  uttrs: [
    [
      "Tutor",
      "Lecturing",
      "So Emily, let's talk about compounds. You know, at first, it can be confusing to understand what's the difference between a compound and a molecule?",
    ],
    [
      "Tutee",
      "Questioning",
      "Well, I was thinking they are similar and can be used interchangeably.",
    ],
    [
      "Tutor",
      "Diagnosing",
      "It's a common misunderstanding. But let's try to make it clear. A compound is a type of molecule. In other words, it's a molecule made up of two different elements. An example would be CO2 or water where two different elements make them up. So they are both a compound and a molecule.",
    ],
    [
      "Tutee",
      "Reflecting",
      "Okay, so if I understand correctly, CO2 and water, they're made of two different elements, which is why they're not just molecules, they're also compounds, right?",
    ],
    [
      "Tutor",
      "Scaffolding",
      "Exactly! You've got the grips of it. A compound is a molecule, but it's a specific type of molecule. That is, it's made up of two different elements. Good job!",
    ],
    [
      "Tutee",
      "Questioning",
      "But what if two of the same elements make a molecule, is that still a compound?",
    ],
    [
      "Tutor",
      "Answering",
      "Excellent question, Emily! If two of the same elements make up a molecule, we don't call it a compound. For instance, think about oxygen gas, which is O2. This is not a compound, but it is a molecule.",
    ],
    [
      "Tutee",
      "Reflecting",
      "So, a molecule is more of a general term and a compound is a specific type of molecule, made up of two different elements.",
    ],
    [
      "Tutor",
      "Summarizing",
      "That's spot on, Emily! Your understanding of the difference between a compound and a molecule has improved a lot. Let's keep exploring these concepts in our next lessons.",
    ],
  ],
  teaching_strategies: [],
};
export const dummy = {
  dialogue_1: { ...sampleData },
  dialogue_2: { ...sampleData },
  dialogue_3: { ...sampleData },
  dialogue_4: { ...sampleData },
};

export interface LevelInfoProps {
  title: string;
  level: number;
  subtitle: string;
}
