import axios from "axios";

import { options } from ".";

export const sendLink = async (
  key: string,
  phone: string,
  message: string,
  url: string,
  description: string,
  title: string,
  thumbnail: string
) => {
  const config = {
    method: "post",
    url: `${options.baseUrl}/message/imageUrl?key=${key}`,
    headers: options.headers,
    data: {
      phoneNumber: phone,
      text: message,
      url,
      description,
      title,
      thumbnail,
    },
  };

  const {
    data: { error },
  } = await axios.request(config);

  if (error) {
    console.log("Erro ao enviar link para lead >", phone);
  }

  return { error };
};
