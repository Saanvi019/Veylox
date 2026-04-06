import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const algorithm = "aes-256-cbc";
const secret = process.env.ENCRYPTION_SECRET;
console.log("SECRET:", process.env.ENCRYPTION_SECRET);

// create 32-byte key
const key = crypto.createHash("sha256").update(secret).digest();

// IV (initialization vector)
const iv = Buffer.alloc(16, 0);

export const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};