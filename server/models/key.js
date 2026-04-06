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
  },
  { timestamps: true } 
);

export default mongoose.model("Key", keySchema);