export type Mode = "magic" | "transcript" | "description";

export interface UtteranceItem {
  id: number;
  speaker: string;
  utterance: string;
}

export const dialogueSample: UtteranceItem[] = [
  {
    id: 1,
    speaker: "Tutor",
    utterance:
      "Let's discuss the concept of integers. Can you tell me what you understand about integers and how they are used in the equation a=bq+r?",
  },
  {
    id: 2,
    speaker: "Tutee",
    utterance:
      "The term 'remainder' relates to what's left over when an integer 'a' is divided by another number 'b'. In the equation a=bq+r, 'r' represents the remainder when an integer 'a' is divided by a positive integer 'b'. It is a value that is a non-negative integer and is less than 'b'.",
  },
  {
    id: 3,
    speaker: "Tutor",
    utterance:
      "Correct, you've understood the backbone of the remainder theorem. Now let's explore it further. Can you explain the full remainder theorem to me?",
  },
  {
    id: 4,
    speaker: "Tutee",
    utterance: "It's a formula we use when dividing integers.",
  },
  {
    id: 5,
    speaker: "Tutee",
    utterance:
      "That's true but incomplete. The remainder theorem states that when an integer is divided by a positive integer 'b', it can be expressed in the form a=bq+r, where 'q' is the quotient and 'r' is the remainder. This theorem allows categorization of integers. Shall we discover more about this?",
  },
  {
    id: 6,
    speaker: "Tutee",
    utterance:
      "Yes, I want to learn how we categorize integers based on this theorem.",
  },
];
