import mongoose from "mongoose";

const ConfigSchema = new mongoose.Schema({
  _id: { type: String, default: "admin_settings" },
  password: { type: String, required: true },
});

export const Config =
  mongoose.models.Config || mongoose.model("Config", ConfigSchema);
