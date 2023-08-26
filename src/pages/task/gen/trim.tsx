/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  updateDescription,
  updateFullVideo,
  updateVideo,
} from "@/states/dataSlice";
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
import TaskContainer from "../components/taskContainer";
import FeatureButton from "../components/featureButton";
import { FaCut } from "react-icons/fa";
import { getTimeRange } from "./utils";

const Trim = () => {
  const dispatch = useDispatch();
  const description = useSelector((state: RootState) => state.data.description);
  const [trim, setTrim] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [range, setRange] = useState<number[]>([200, 700]);
  const video: string | null = useSelector(
    (state: RootState) => state.data.video
  );
  const videoRef = useRef(null);

  const onTrim = async () => {
    if (!video || !duration || !description) return;
    const times = getTimeRange(range, duration);
    const fullTimes = getTimeRange(
      [Math.max(0, range[0] - 30), Math.min(duration, range[1] + 30)],
      duration
    );
    dispatch(updateDescription(description + " | " + times[2]));

    const ffmpeg = new FFmpeg();
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/esm";

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    await ffmpeg.writeFile("video.mp4", await fetchFile(video));

    // origin trim range
    await ffmpeg.exec([
      "-i",
      "video.mp4",
      "-ss",
      times[0],
      "-to",
      times[1],
      "-c",
      "copy",
      "output.mp4",
    ]);
    const data = (await ffmpeg.readFile("output.mp4")) as any;
    dispatch(
      updateVideo(
        URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
      )
    );

    // full trim range
    await ffmpeg.exec([
      "-i",
      "video.mp4",
      "-ss",
      fullTimes[0],
      "-to",
      fullTimes[1],
      "-c",
      "copy",
      "output.mp4",
    ]);
    const dataFull = (await ffmpeg.readFile("output.mp4")) as any;
    dispatch(
      updateFullVideo(
        URL.createObjectURL(new Blob([dataFull.buffer], { type: "video/mp4" }))
      )
    );

    dispatch(doneTask());
    setTrim(true);

    console.log("trim done", description);
  };

  const onChange = (value: number | readonly number[], index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const video = videoRef.current as any;
    if (!video || !duration) return;

    const values = value as number[];
    setRange(values);
    const time: number = (values[index] * duration) / 1000;
    if (!isNaN(time)) video.seekTo(parseFloat(time.toFixed(4)), "seconds");
  };

  const onDuration = (value: number) => {
    setDuration(value);
  };

  return (
    <TaskContainer gap={5} padding={true} align="start">
      <FeatureButton text="Trim" onClick={onTrim} disable={trim}>
        <FaCut />
      </FeatureButton>
      <ReactPlayer
        width="100%"
        height="100%"
        ref={videoRef}
        url={video ?? ""}
        controls={true}
        onDuration={onDuration}
      />
      <TrimSlider
        onChange={onChange}
        max={1000}
        defaultValue={[0, 700]}
        renderTrack={Track}
        renderThumb={Thumb}
      />
    </TaskContainer>
  );
};
export default Trim;

const TrimSlider = styled(ReactSlider)`
  width: 100%;
  height: 45px;

  display: flex;
  align-items: center;
`;

const TrimThumb = styled.div`
  width: 23px;
  height: 23px;

  border-radius: 20px;
  background-color: ${colors["green200"]};
  /* border: 2px solid ${colors["green200"]}; */

  &:focus {
    outline: none;
    background-color: ${colors["green200"]};
    box-shadow: 0px 0px 0px 7px rgba(172, 255, 199, 0.4);
  }
  /* box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2); */

  cursor: grab;
`;

const TrimTrack = styled.div`
  justify-self: stretch;
  height: 8px;

  background: ${(props: any) =>
    colors[props.index == 1 ? "green200" : "green50"]};
  /* border: 1px solid ${colors["gray200"]}; */
  border-radius: 5px;
`;

const Thumb = (props: any) => <TrimThumb {...props}></TrimThumb>;

const Track = (props: any, state: any) => (
  <TrimTrack {...props} index={state.index} />
);
