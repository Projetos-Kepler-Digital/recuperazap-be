import { Timestamp } from 'firebase-admin/firestore';

import { formatMessage } from './utils/formatMessage';

import { sendText } from './functions/sendText';
import { sendAudio } from './functions/sendAudio';
import { sendDoc } from './functions/sendDoc';
import { sendVideo } from './functions/sendVideo';
import { sendImage } from './functions/sendImage';

import type { Lead } from '../types/Lead';
import type { Shoot } from '../types/Shoot';

import * as logger from 'firebase-functions/logger';

export const sendMessage = async (
  userId: string,
  lead: Lead,
  shoot: Shoot,
  ctime: Timestamp
) => {
  if (!lead.phone) return;

  let msgSent = false;
  let message = '';

  if (!!shoot.message) {
    message = formatMessage(shoot.message, lead, ctime);
  }

  if (!!shoot.audio) {
    logger.log('Sending message into sendAudio');
    await sendAudio(userId, lead.phone, shoot.audio, shoot.delayAudio);
  }

  if (!!shoot.image) {
    logger.log('Sending message into sendImage');
    await sendImage(
      userId,
      lead.phone,
      shoot.image.url,
      !msgSent ? message : ''
    );
    msgSent = true;
  }

  if (!!shoot.doc) {
    logger.log('Sending message into sendDoc');
    await sendDoc(userId, lead.phone, shoot.doc.url, !msgSent ? message : '');
    msgSent = true;
  }

  if (!!shoot.video) {
    logger.log('Sending message into sendVideo');
    await sendVideo(
      userId,
      lead.phone,
      shoot.video.url,
      !msgSent ? message : ''
    );
    msgSent = true;
  }

  if (!!shoot.message && !msgSent) {
    logger.log('Sending message into sendText');
    await sendText(userId, lead.phone, message, shoot.delayMessage);
  }
};
