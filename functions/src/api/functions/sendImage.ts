import axios from "axios";

import { options } from ".";

export const sendImage = async (
  key: string,
  phone: string,
  image: string,
  caption: string
) => {
  const config = {
    method: "post",
    url: `${options.baseUrl}/message/imageUrl?key=${key}`,
    headers: options.headers,
    data: {
      id: phone,
      imageurl: image,
      caption,
      delayMessage: 0,
    },
  };

  const {
    data: { error },
  } = await axios.request(config);

  if (error) {
    console.log("Erro ao enviar imagem para lead >", phone);
  }

  return { error };
};
