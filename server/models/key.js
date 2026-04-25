import mongoose from "mongoose";

const keySchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    label: {
      type: String, 
    },
    encryptedKey: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    lastUsed: {
      type: Date,
      default: null, 
    },
    expiryDate: {
      type: Date,
    },
    lastReminderSent: {
      type: Date,
    },
    usageCount: {
     type: Number,
     default: 0,
    },
    limit: {
     type: Number,
     default: 100,
    }
  },
  { timestamps: true } 
);

export default mongoose.model("Key", keySchema);