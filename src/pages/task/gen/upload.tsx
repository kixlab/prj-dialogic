import { updateVideo } from "@/states/genSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Upload = () => {
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      dispatch(updateVideo(URL.createObjectURL(e.target.files[0] as Blob)));
  };

  return <UploadWrapper type="file" onChange={onChange} />;
};
export default Upload;

const UploadWrapper = styled.input`
  width: 100px;
  height: 50px;
`;
