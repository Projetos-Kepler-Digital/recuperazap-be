import axios from "axios";

import { options } from ".";

export const sendText = async (
  key: string,
  phone: string,
  message: string,
  delayTyping?: number
) => {
  const config = {
    method: "post",
    url: `${options.baseUrl}/message/text?key=${key}`,
    headers: options.headers,
    data: {
      id: phone,
      message,
      ...(!!delayTyping && { delayMessage: delayTyping }),
    },
  };

  const {
    data: { error },
  } = await axios.request(config);

  if (error) {
    console.log("Erro ao enviar mensagem para lead >", phone);
  }

  return { error };
};
