import { text } from "@/states/constant";

export const getStatus = (stepNum: number, step: number) => {
  if (stepNum < step) return "done";
  else if (stepNum == step) return "onGoing";
  else return "pending";
};

export const getSpeakerName = (speaker: number) => {
  if (speaker == 0) return text.dialoge.tutor;
  else return text.dialoge.tutee + speaker;
};

const learningStrategy: string[] = [
  "Cognitive conflict",
  "Metacognitive prompting",
  "Cognitive prompting",
  "Deep-level reasoning questions",
];

export const getTagTheme = (title: string) => {
  const idx: number = learningStrategy.findIndex(
    (strategy) => strategy == title
  );
  switch (idx) {
    case 0:
      return "pink";
    case 1:
      return "purple";
    case 2:
      return "yellow";
    case 3:
      return "blue";
    default:
      return "brown";
  }
};
