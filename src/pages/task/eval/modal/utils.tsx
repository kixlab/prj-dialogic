export const summary =
  "Alice confused about the order of the photosynthesis process. With tutor’s scaffolding, she could explain each step by herself";
export const strategy: string[] = [
  "cognitive conflict",
  "cognitive prompting",
  "metacognitive prompting",

  "spontaneous deep-level reasoning question",
];

export const pattern: string[] = [
  "tutor->tutee",
  "tutee->tutor",
  "tutor->tutor",
];

export interface LevelInfoProps {
  title: string;
  level: number;
  subtitle: string;
}

export const level: LevelInfoProps[] = [
  {
    title: "Calculating midpoint",
    level: 4,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
  {
    title: "Basic notion of binary searcht",
    level: 2,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
  {
    title: "Maximum calculation number of binary search",
    level: 1,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
  {
    title: "Understanding the depth of binary search tree",
    level: 3,
    subtitle:
      "Description of corresponding level regarding to the key concepts. Lower level indicates a paucity of knowledge",
  },
];
