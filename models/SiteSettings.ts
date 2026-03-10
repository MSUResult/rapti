import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema({
  heroImage: String,
});

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
