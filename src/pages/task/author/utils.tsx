import { UtteranceItem } from "@/states/types";
import { v4 as uuid } from "uuid";

export const dialogueSample: UtteranceItem[] = [
  {
    id: uuid(),
    speaker: 0,
    utterance:
      "Let's discuss the concept of integers. Can you tell me what you understand about integers and how they are used in the equation a=bq+r?",
  },
  {
    id: uuid(),
    speaker: 1,
    utterance:
      "The term 'remainder' relates to what's left over when an integer 'a' is divided by another number 'b'. In the equation a=bq+r, 'r' represents the remainder when an integer 'a' is divided by a positive integer 'b'. It is a value that is a non-negative integer and is less than 'b'.",
  },
  {
    id: uuid(),
    speaker: 0,
    utterance:
      "Correct, you've understood the backbone of the remainder theorem. Now let's explore it further. Can you explain the full remainder theorem to me?",
  },
  {
    id: uuid(),
    speaker: 1,
    utterance: "It's a formula we use when dividing integers.",
  },
  {
    id: uuid(),
    speaker: 0,
    utterance:
      "That's true but incomplete. The remainder theorem states that when an integer is divided by a positive integer 'b', it can be expressed in the form a=bq+r, where 'q' is the quotient and 'r' is the remainder. This theorem allows categorization of integers. Shall we discover more about this?",
  },
  {
    id: uuid(),
    speaker: 1,
    utterance:
      "Yes, I want to learn how we categorize integers based on this theorem.",
  },
];

export const getTargetNum = (targets: number[]): number => {
  if (targets.length == 0 || targets[0] == -1) return 0;
  else return targets[1] - targets[0] + 1;
};

export const isTarget = (targets: number[], idx: number) => {
  if (targets.length == 0 || targets[0] == -1) return false;

  if (targets[0] <= idx && idx <= targets[1]) return true;
  return false;
};
