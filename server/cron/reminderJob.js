import cron from "node-cron";
import Key from "../models/key.js";
import { sendEmail } from "../utils/sendEmail.js";

export const startReminderJob = () => {
  // 🔥 runs every day at midnight (use */10 for testing)
  cron.schedule("*/10 * * * * *", async () => {
    try {
      console.log("⏰ Running reminder job...");

      const now = new Date();
      const next2Days = new Date();
      next2Days.setDate(now.getDate() + 2);

      // ✅ Fetch ONLY relevant keys + prevent spam
      const keys = await Key.find({
        expiryDate: {
          $gte: now,
          $lte: next2Days,
        },
        $or: [
          { lastReminderSent: { $exists: false } },
          {
            lastReminderSent: {
              $lte: new Date(now.getTime() - 24 * 60 * 60 * 1000),
            },
          },
        ],
      }).populate({
        path: "project",
        populate: {
          path: "owner",
          model: "User",
        },
      });

      console.log("Expiring keys:", keys.length);

      for (const key of keys) {
        const email = key.project?.owner?.email;

        if (!email) {
          console.log("⚠️ No email for key:", key._id);
          continue;
        }

        console.log("📧 Sending to:", email);

        // ✅ Send email
        await sendEmail(
          email,
          "⚠️ API Key Expiring Soon",
          `Your API key for ${key.serviceName} is expiring on ${new Date(
            key.expiryDate
          ).toDateString()}. Please update it.`
        );

        // ✅ Prevent spam (mark as sent)
        await Key.findByIdAndUpdate(key._id, {
          lastReminderSent: new Date(),
        });
      }
    } catch (err) {
      console.error("❌ Cron error:", err.message);
    }
  });
};