import axios from "axios";

import { options } from ".";

export const sendDoc = async (
  key: string,
  phone: string,
  doc: string,
  fileName: string
) => {
  const config = {
    method: "post",
    url: `${options.baseUrl}/message/docurl?key=${key}`,
    headers: options.headers,
    data: {
      id: phone,
      url: doc,
      filename: fileName,
      delayMessage: 0,
    },
  };

  const {
    data: { error },
  } = await axios.request(config);

  if (error) {
    console.log("Erro ao enviar documento para lead >", phone);
  }

  return { error };
};
