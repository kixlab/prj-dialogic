export interface UtteranceItem {
  id: string;
  speaker: number;
  utterance: string;
}
export type AuthorMode = "magic" | "transcript" | "description";
