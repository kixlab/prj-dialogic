import { getScript } from "@/apis/openai";
import { RootState } from "@/states/state";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Selection, addMarks, getSelections } from "./utils";

const Script = () => {
  const [script, setScript] = useState<string>("");
  const [selections, setSelections] = useState<Selection[]>([]);

  const video: string | null = useSelector(
    (state: RootState) => state.gen.video
  );

  useEffect(() => {
    if (!video) return;
    const asyncWrapper = async () => {
      const newScript = await getScript(video);
      if (!newScript) return;
      setScript(newScript);
    };
    asyncWrapper();
  });

  useEffect(() => {
    const scriptWrapper = document.getElementById("transcript") as HTMLElement;
    scriptWrapper.innerHTML = addMarks(script, selections);
  }, [selections, script]);

  const onMouseUp = () => {
    const selection = window.getSelection();
    if (selection) {
      const selectionString = selection.toString();
      if (selectionString == " " || selectionString == "") return;

      const start = script.indexOf(selectionString);
      const end = start + selectionString.length - 1;

      setSelections(getSelections([...selections, { start, end }]));
    }
  };

  return (
    <>
      <button onClick={() => setSelections([])}>init</button>
      <div id="transcript" onMouseUp={onMouseUp}>
        {script ? "" : "script is loading"}
      </div>
    </>
  );
};
export default Script;
