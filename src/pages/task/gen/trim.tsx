import { updateVideo } from "@/states/genSlice";
import { RootState } from "@/states/state";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";

const Trim = () => {
  const video: string | null = useSelector(
    (state: RootState) => state.gen.video
  );
  const dispatch = useDispatch();
  const [progress, setProgress] = useState<number>(0);

  const onTrim = async () => {
    if (!video) return;
    console.log("start Trim")!;

    const ffmpeg = new FFmpeg();
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/esm";

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    ffmpeg.on("progress", ({ progress }) => {
      setProgress(progress * 100);
    });
    await ffmpeg.writeFile("video.mp4", await fetchFile(video));

    await ffmpeg.exec([
      "-i",
      "video.mp4",
      "-ss",
      "00:05:00",
      "-to",
      "00:05:30",
      "-c",
      "copy",
      "output.mp4",
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await ffmpeg.readFile("output.mp4")) as any;
    dispatch(
      updateVideo(
        URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
      )
    );
  };
  return (
    <>
      {video && <ReactPlayer url={video} controls={true} />}
      <button onClick={onTrim}>Trim {`${progress}% done`}</button>
    </>
  );
};
export default Trim;
