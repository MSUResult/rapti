"use server";
import mongoose from "mongoose";
import { Config } from "@/models/AdminPassword";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

export async function verifyAdminPassword(inputPassword) {
  try {
    console.log("Attempting to connect to DB...");
    await connectDB();
    console.log("DB Connected successfully.");

    const settings = (await Config.findOne({ _id: "admin_settings" })) || 
                     (await Config.create({ password: "admin123" }));
    
    console.log("Settings found/created:", settings ? "Yes" : "No");
    return settings.password === inputPassword;
  } catch (error) {
    console.error("Database Error:", error.message);
    return false;
  }
}

export async function updateAdminPassword(oldPwd, newPwd) {
  await connectDB();
  const settings = await Config.findOne({ _id: "admin_settings" });
  if (settings.password !== oldPwd)
    return { success: false, error: "Incorrect old password" };

  await Config.updateOne({ _id: "admin_settings" }, { password: newPwd });
  return { success: true };
}
