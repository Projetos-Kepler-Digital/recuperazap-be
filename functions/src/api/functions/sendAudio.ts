import axios from 'axios';

import { options } from '.';

export const sendAudio = async (
  key: string,
  phone: string,
  audio: string,
  delayRecording?: number | string
) => {
  const config = {
    method: 'post',
    url: `${options.baseUrl}/message/audiourl?key=${key}`,
    headers: options.headers,
    data: {
      id: phone,
      url: audio,
      ...(!!delayRecording && { delayMessage: delayRecording }),
    },
  };

  const {
    data: { error },
  } = await axios.request(config);

  if (error) {
    console.log('Erro ao enviar áudio para lead >', phone);
  }

  return { error };
};
