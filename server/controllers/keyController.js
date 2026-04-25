import Key from "../models/key.js";
import { encrypt } from "../utils/encryption.js";
import { decrypt } from "../utils/encryption.js";
import { maskKey } from "../utils/mask.js";
import Project from "../models/project.js";

export const addKey = async (req, res) => {
  try {
    const { serviceName, apiKey, projectId, label, expiryDate } = req.body;
    

const project = await Project.findById(projectId);

if (!project) {
  return res.status(404).json({ message: "Project not found" });
}

    const encryptedKey = encrypt(apiKey);

    const key = await Key.create({
      serviceName,
      label,
      encryptedKey,
      project: projectId,
      expiryDate,
    });

    res.json(key);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adding key" });
  }
};

export const getKeysByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const keys = await Key.find({ project: projectId });

    const formattedKeys = keys.map((k) => {
      const decrypted = decrypt(k.encryptedKey);

      return {
  _id: k._id,
  serviceName: k.serviceName,
  label: k.label,
  maskedKey: maskKey(decrypted),
  createdAt: k.createdAt,
  lastUsed: k.lastUsed,
  expiryDate: k.expiryDate,
  isExpired: k.expiryDate
    ? new Date(k.expiryDate) < new Date()
    : false,

  
  usageCount: k.usageCount,
  limit: k.limit,
};
    });

    res.json(formattedKeys);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching keys" });
  }
};

export const getAllKeysForUser = async (req, res) => {
  try {
    const keys = await Key.find()
      .populate({
        path: "project",
        match: { owner: req.user.id }, // ✅ filter by logged-in user
      });

    // remove keys not belonging to user
    const filteredKeys = keys.filter((k) => k.project !== null);

    res.json(filteredKeys);
  } catch (err) {
    res.status(500).json({ message: "Error fetching keys" });
  }
};

export const deleteKey = async (req, res) => {
  try {
    const { keyId } = req.params;

    await Key.findByIdAndDelete(keyId);

    res.json({ message: "Key deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting key" });
  }
};

export const getAllKeys = async (req, res) => {
  try {
    const userId = req.userId;

    // get all projects of this user
   const projects = await Project.find({ ownerId: userId });

    const projectIds = projects.map((p) => p._id);

    const keys = await Key.find({ project: { $in: projectIds } });

    res.json(keys);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching keys" });
  }
};
export const useKey = async (req, res) => {
  try {
    const key = await Key.findByIdAndUpdate(
  req.params.id,
  {
    $inc: { usageCount: 1 },
    lastUsed: new Date(),
  },
  { returnDocument: "after" }
);

    res.json(key);
  } catch (err) {
    res.status(500).json({ message: "Error updating usage" });
  }
};