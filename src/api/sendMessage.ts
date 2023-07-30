import { Timestamp } from "firebase-admin/firestore";

import { formatMessage } from "./utils/formatMessage";

import { sendText } from "./functions/sendText";
import { sendAudio } from "./functions/sendAudio";
import { sendDoc } from "./functions/sendDoc";
import { sendVideo } from "./functions/sendVideo";
import { sendImage } from "./functions/sendImage";

import type { Lead } from "../types/Lead";
import type { Shoot } from "../types/Shoot";

export const sendMessage = async (
  userId: string,
  lead: Lead,
  shoot: Shoot,
  ctime: Timestamp
) => {
  if (!lead.phone) return;

  let msgSent = false;
  let message = "";

  if (!!shoot.message) {
    message = formatMessage(shoot.message, lead, ctime);
  }

  if (!!shoot.audio) {
    await sendAudio(userId, lead.phone, shoot.audio, shoot.delayAudio);
  }

  if (!!shoot.image) {
    await sendImage(
      userId,
      lead.phone,
      shoot.image.url,
      !msgSent ? message : ""
    );
    msgSent = true;
  }

  if (!!shoot.doc) {
    await sendDoc(userId, lead.phone, shoot.doc.url, !msgSent ? message : "");
    msgSent = true;
  }

  if (!!shoot.video) {
    await sendVideo(
      userId,
      lead.phone,
      shoot.video.url,
      !msgSent ? message : ""
    );
    msgSent = true;
  }

  if (!!shoot.message && !msgSent) {
    await sendText(userId, lead.phone, message, shoot.delayMessage);
  }
};
