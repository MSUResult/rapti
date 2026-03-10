import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { registrationNumber } = body;

    // Only check for duplicates IF a registration number was actually provided
    if (registrationNumber) {
      const existingStudent = await Student.findOne({ registrationNumber });
      if (existingStudent) {
        return NextResponse.json(
          { message: "Registration Number already exists!" },
          { status: 409 }
        );
      }
    }

    // Save student (it will save all fields including the subjects array)
    const newStudent = await Student.create(body);

    return NextResponse.json(
      {
        message: "Student Saved Successfully",
        data: newStudent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ API Error:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}