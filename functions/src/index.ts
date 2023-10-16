import * as functions from 'firebase-functions';

import { Timestamp } from 'firebase-admin/firestore';

import * as logger from 'firebase-functions/logger';

import { sendMessage } from './api/sendMessage';

export const taskRunner = functions
  .region('southamerica-east1')
  .runWith({ maxInstances: 5, memory: '2GB' })
  .firestore.document('workers/{workerId}')
  .onCreate(async (snapshot, context) => {
    const { userId, lead, shoot } = snapshot.data();

    logger.log({ userId, lead, shoot });

    await sendMessage(userId, lead, shoot, Timestamp.now()).then(() =>
      snapshot.ref.delete()
    );
  });
