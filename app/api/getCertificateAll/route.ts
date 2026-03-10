import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

export async function GET() {
  try {
    await dbConnect();

    const students = await Student.find({}).sort({ createdAt: -1 });

    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch All Students Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch students" },
      { status: 500 },
    );
  }
}
