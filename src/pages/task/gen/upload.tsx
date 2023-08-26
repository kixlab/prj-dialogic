import {
  initDescription,
  initVideo,
  updateDescription,
  updateVideo,
} from "@/states/dataSlice";
import { colors } from "@/styles/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { BoldText, RegularText } from "@/styles/text";
import { getSize } from "./utils";
import { doneTask, initTask } from "@/states/phaseSlice";

import { IconContext } from "react-icons";
import { BiVideo, BiX, BiSolidCloudUpload } from "react-icons/bi";

interface FileInfo {
  name: string;
  size: number;
}

const Upload = () => {
  const dispatch = useDispatch();
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0].type == "video/mp4") {
      const { name, size } = e.target.files[0];
      setFileInfo({ name, size });
      dispatch(updateVideo(URL.createObjectURL(e.target.files[0] as Blob)));
      dispatch(updateDescription(name));
      dispatch(doneTask());
    }
  };

  const onClose = () => {
    // init file upload
    setFileInfo(null);
    dispatch(initVideo());
    dispatch(initDescription());
    dispatch(initTask());
  };

  return (
    <>
      {fileInfo ? (
        <FileContainer fileInfo={fileInfo} onClose={onClose} />
      ) : (
        <UploadContainer onUpload={onUpload} />
      )}
    </>
  );
};
export default Upload;

const UploadContainer = ({
  onUpload,
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <UploadContainerWrapper htmlFor="uploadFile">
      <UploadWrapper
        id="uploadFile"
        type="file"
        onChange={onUpload}
        accept="video/mp4"
      />
      <BoldText text="Choose the file" color="green300" size={15} />
      <RegularText text="(.mp4) to upload" color="gray300" size={15} />
      <IconContext.Provider
        value={{
          color: colors["gray300"],
          style: { width: "20px", height: "auto" },
        }}
      >
        <BiSolidCloudUpload />
      </IconContext.Provider>
    </UploadContainerWrapper>
  );
};

const UploadContainerWrapper = styled.label`
  justify-self: stretch;
  height: 70px;

  position: relative;
  box-sizing: border-box;
  border: 2px dotted ${colors["gray200"]};
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;

  cursor: pointer;
`;

const UploadWrapper = styled.input`
  display: none;
`;

interface FileContainerProps {
  fileInfo: FileInfo;
  onClose: () => void;
}

const FileContainer = (props: FileContainerProps) => {
  return (
    <FileContainerWrapper>
      <FileInfoWrapper>
        <IconContext.Provider
          value={{
            color: colors["green400"],
            style: { width: "25px", height: "auto" },
          }}
        >
          <BiVideo onClick={props.onClose} />
        </IconContext.Provider>
        <FileTitleWrapper>
          <BoldText text={props.fileInfo.name} color="gray400" size={15} />
          <RegularText
            text={getSize(props.fileInfo.size)}
            color="gray300"
            size={13}
          />
        </FileTitleWrapper>
      </FileInfoWrapper>

      <IconContext.Provider
        value={{
          color: colors["green400"],
          style: { width: "20px", height: "auto", cursor: "pointer" },
        }}
      >
        <BiX onClick={props.onClose} />
      </IconContext.Provider>
    </FileContainerWrapper>
  );
};

const FileContainerWrapper = styled.div`
  justify-self: stretch;
  height: 70px;

  box-sizing: border-box;
  padding: 16px 20px;
  background-color: ${colors["gray100"]};
  border-radius: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FileInfoWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const FileTitleWrapper = styled.div`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 2px;
`;
