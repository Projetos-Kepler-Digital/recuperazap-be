import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

import { sendMessage } from "./api/sendMessage";

export const taskRunner = functions
  .runWith({ memory: "2GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();

    const query = db.collection("workers").where("performAt", "<=", now);
    const tasks = await query.get();

    const jobs: Promise<any>[] = [];

    tasks.forEach((snapshot) => {
      const { userId, lead, shoot } = snapshot.data();

      const job = sendMessage(userId, lead, shoot, now)
        .then(() => snapshot.ref.delete())
        .catch((err) =>
          snapshot.ref.update({ status: "error", error: err.response.data })
        );

      jobs.push(job);
    });

    return await Promise.all(jobs);
  });
