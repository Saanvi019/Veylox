import mongoose from "mongoose";

const keySchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
    },
    encryptedKey: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Key", keySchema);