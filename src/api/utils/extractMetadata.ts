import axios from "axios";
import { getLinkPreview } from "link-preview-js";

export const getURL = (str: string) => {
  const urlPattern = /^(?:https?:\/\/)?(?:www\.)?([^\s.]+\.\S{2,})$/i;
  const match = str.match(urlPattern);

  return {
    isURL: !!match,
    url: match ? match[0] : null,
  };
};

export const extractMetadata = async (url: string) => {
  try {
    const result = await getLinkPreview(url);

    if ("title" in result && "description" in result) {
      const response = await axios.get(result.favicons[0], {
        responseType: "arraybuffer",
      });

      const faviconBase64 = Buffer.from(response.data, "binary").toString(
        "base64"
      );

      return {
        favicon: faviconBase64,
        title: result.title,
        description: result.description ?? "",
      };
    }
  } catch (err) {
    console.log(err);
  }

  return null;
};
