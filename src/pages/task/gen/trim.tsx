/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateVideo } from "@/states/dataSlice";
import { doneTask } from "@/states/phaseSlice";
import { RootState } from "@/states/state";
import { colors } from "@/styles/colors";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import ReactSlider from "react-slider";
import styled from "styled-components";

const Trim = () => {
  const dispatch = useDispatch();
  const video: string | null = useSelector(
    (state: RootState) => state.data.video
  );

  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef(null);

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
    dispatch(doneTask());
  };

  const onChange = (value: number | readonly number[], index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const video = videoRef.current as any;
    if (!video) return;

    const values = value as number[];
    const ratio: number = values[index] / 1000;
    video.seekTo(ratio, "fraction");
  };

  return (
    <>
      {video && (
        <ReactPlayer
          style={{ justifySelf: "stretch" }}
          ref={videoRef}
          url={video}
          controls={true}
        />
      )}
      <TrimSlider
        onChange={onChange}
        max={1000}
        defaultValue={[200, 700]}
        renderTrack={Track}
        renderThumb={Thumb}
      />{" "}
      <button onClick={onTrim}>Trim {`${progress}% done`}</button>
    </>
  );
};
export default Trim;

const TrimSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;

  display: flex;
  align-items: center;
`;

const TrimThumb = styled.div`
  width: 16px;
  height: 24px;

  border-radius: 5px;
  background-color: ${colors["green50"]};
  border: none;

  &:focus {
    outline: 2px solid ${colors["green300"]};
  }

  cursor: grab;
`;

const TrimTrack = styled.div`
  justify-self: stretch;
  height: 16px;

  background: ${(props: any) =>
    colors[props.index == 1 ? "green200" : "gray100"]};
  border-radius: 5px;
`;

const Thumb = (props: any) => <TrimThumb {...props}></TrimThumb>;

const Track = (props: any, state: any) => (
  <TrimTrack {...props} index={state.index} />
);
