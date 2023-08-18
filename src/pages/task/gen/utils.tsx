export interface Selection {
  start: number;
  end: number;
}

export const getSelections = (prevSelections: Selection[]): Selection[] => {
  if (prevSelections.length <= 1) {
    return prevSelections; // No need to merge
  }
  prevSelections.sort((a, b) => a.start - b.start); // Sort by start index

  const selections: Selection[] = [prevSelections[0]];

  for (let i = 1; i < prevSelections.length; i++) {
    const currSelection = prevSelections[i];
    const lastSelection = selections[selections.length - 1];

    if (currSelection.start <= lastSelection.end) {
      // overlapped
      lastSelection.end = Math.max(lastSelection.end, currSelection.end);
    } else {
      // no overlap
      selections.push(currSelection);
    }
  }

  return selections;
};

export const addMarks = (script: string, selections: Selection[]): string => {
  if (selections.length == 0) return script;

  let result = "";
  let currentIndex = 0;

  selections.forEach((selection: Selection) => {
    const { start, end } = selection;

    result += script.substring(currentIndex, start); // Append text before the highlight
    result += `<mark>${script.substring(start, end + 1)}</mark>`; // Wrap highlighted text with <mark> tags

    currentIndex = end + 1; // Update the current index to the end of the highlighted portion
  });

  result += script.substring(currentIndex); // Append any remaining text after the last highlight
  return result;
};
