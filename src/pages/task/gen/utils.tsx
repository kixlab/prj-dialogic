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
      console.log(
        lastSelection.end,
        Math.max(lastSelection.end, currSelection.end)
      );
      // overlapped
      lastSelection.end = Math.max(lastSelection.end, currSelection.end);
    } else {
      // no overlap
      selections.push(currSelection);
    }
  }

  return selections;
};

export const getSelectionString = (
  script: string,
  selections: Selection[]
): string[] => {
  const result: string[] = [];
  selections.forEach((selection: Selection) => {
    const { start, end } = selection;
    result.push(script.substring(start, end + 1));
  });
  return result;
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

export const getSize = (bytes: number): string => {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  }
};

export const getTimeRange = (range: number[], duration: number) => {
  const start = (duration * range[0]) / 1000;
  const end = (duration * range[1]) / 1000;

  const startString = timeToString(start);
  const endString = timeToString(end);

  return [
    `${startString[0]}:${startString[1]}:${startString[2]}`,
    `${endString[0]}:${endString[1]}:${endString[2]}`,
    `${startString[1]}:${startString[2]}-${endString[1]}:${endString[2]}`,
  ];
};

const timeToString = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds
    .toFixed(0)
    .toString()
    .padStart(2, "0");

  return [formattedHours, formattedMinutes, formattedSeconds];
};

export const tuteeToNumber = (tutee: string) => {
  const num = parseInt(tutee);
  if (!num || Number.isNaN(num)) return 1;
  else return num;
};
