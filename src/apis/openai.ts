import axios from "axios";

const { VITE_OPENAI_API_KEY } = import.meta.env;

export const getScript = async (url: string): Promise<string | void> => {
  return await fetch(url)
    .then(res => res.blob())
    .then(async (file: Blob) => {
      const formData = new FormData();
      formData.append('file', file, 'input.mp4');
      formData.append('model', 'whisper-1');
      formData.append('language', 'ko');
      // Now you have the Blob representing the mp4 video
      // You can use the 'blob' variable here

      const res = await axios.post(`https://api.openai.com/v1/audio/transcriptions`, formData, {
        headers: {
          Authorization: `Bearer ${VITE_OPENAI_API_KEY}`,
        }
      });
      return res.data.text as string;
    });
}