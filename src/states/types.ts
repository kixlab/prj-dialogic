export interface UtteranceItem {
  id: string;
  speaker: number;
  utterance: string;
}

export interface VariationItem {
  speaker: number;
  category: string;
  utterance: string;
}

export type AuthorMode = "magic" | "transcript" | "description";

export interface LevelInfo {
  title: string;
  level: number;
  subtitle: string;
}

export interface PatternInfo {
  title: string;
  start: number;
  end: number;
}

export interface GenerationItem {
  teaching_strategies: string[];
  learning_objective: string;
  patterns: number[][];
  teaching_scenario: string;
  understanding_states: string[][];
  uttrs: string[][];
}