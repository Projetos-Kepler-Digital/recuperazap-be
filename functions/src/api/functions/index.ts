export const whatsapp = {
  protocol: "https:",
  host: "host1025.painelzapi.com.br",
  token: "12Htt0-hv99RT-H58xeT-Wkf8Mz-56lvGg",
};

export const options = {
  baseUrl: `${whatsapp.protocol}//${whatsapp.host}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${whatsapp.token}`,
  },
};
