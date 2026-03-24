"use server";
import mongoose from "mongoose";
import { Config } from "@/models/AdminPassword";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function verifyAdminPassword(inputPassword) {
  await connectDB();
  const settings =
    (await Config.findOne({ _id: "admin_settings" })) ||
    (await Config.create({ password: "admin123" }));
  return settings.password === inputPassword;
}

export async function updateAdminPassword(oldPwd, newPwd) {
  await connectDB();
  const settings = await Config.findOne({ _id: "admin_settings" });
  if (settings.password !== oldPwd)
    return { success: false, error: "Incorrect old password" };

  await Config.updateOne({ _id: "admin_settings" }, { password: newPwd });
  return { success: true };
}
