import axios from "axios";

import { options } from ".";

export const sendVideo = async (
  key: string,
  phone: string,
  video: string,
  caption: string
) => {
  const config = {
    method: "post",
    url: `${options.baseUrl}/message/Videourl?key=${key}`,
    headers: options.headers,
    data: {
      id: phone,
      url: video,
      caption,
      delayMessage: 0,
    },
  };

  const {
    data: { error },
  } = await axios.request(config);

  if (error) {
    console.log("Erro ao enviar vídeo para lead >", phone);
  }

  return { error };
};
