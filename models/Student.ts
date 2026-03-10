import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
  registrationNumber: { type: String, unique: true }, // Keep this unique
  certificateNumber: String,
  name: String,
  dob: String,
  gender: String,
  education: String,
  fatherName: String,
  motherName: String,
  identityProof: String,
  identityDocNo: String,
  courseName: String,
  customCourseName: String,
  duration: String,
  startDate: String,
  endDate: String,
  subjects: [String], // This saves your array of 6 subjects
  },
  { timestamps: true }
);

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
