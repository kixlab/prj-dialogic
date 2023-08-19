import { initVideo, updateVideo } from "@/states/genSlice";
import { colors } from "@/styles/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import CloseIconImg from "@/assets/close.svg";
import VideoIconImg from "@/assets/video.svg";
import UploadIconImg from "@/assets/upload.svg";
import { BoldText, RegularText } from "@/styles/text";
import { getSize } from "./utils";
import { doneTask, initTask } from "@/states/phaseSlice";

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
      dispatch(doneTask());
    }
  };

  const onClose = () => {
    // init file upload
    setFileInfo(null);
    dispatch(initVideo());
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
      <UploadIcon src={UploadIconImg} />
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

const UploadIcon = styled.img`
  width: 16px;
  padding: 4px;
`;

interface FileContainerProps {
  fileInfo: FileInfo;
  onClose: () => void;
}

const FileContainer = (props: FileContainerProps) => {
  return (
    <FileContainerWrapper>
      <FileInfoWrapper>
        <FileIcon src={VideoIconImg} />
        <FileTitleWrapper>
          <BoldText text={props.fileInfo.name} color="gray400" size={15} />
          <RegularText
            text={getSize(props.fileInfo.size)}
            color="gray300"
            size={13}
          />
        </FileTitleWrapper>
      </FileInfoWrapper>
      <DeleteIcon src={CloseIconImg} onClick={props.onClose} />
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

const FileIcon = styled.img`
  width: 22px;
`;

const DeleteIcon = styled.img`
  width: 10px;
  cursor: pointer;

  padding: 5px;
`;
