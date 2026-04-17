import cron from "node-cron";
import Key from "../models/key.js";

export const startReminderJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("⏰ Running reminder job...");

    const now = new Date();
    const next2Days = new Date();
    next2Days.setDate(now.getDate() + 2);

    const keys = await Key.find({
      expiryDate: {
        $gte: now,
        $lte: next2Days,
      },
    });

    console.log("Expiring keys:", keys.length);
  });
};