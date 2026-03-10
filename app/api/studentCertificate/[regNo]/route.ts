import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Student from "@/models/Student";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ regNo: string }> },
) {
  try {
    await dbConnect();

    // Await the params before using them
    const { regNo } = await params;

    // Search by either registrationNumber OR certificateNumber
    const student = await Student.findOne({
      $or: [{ registrationNumber: regNo }, { certificateNumber: regNo }],
    });

    if (!student) {
      return NextResponse.json(
        {
          message:
            "No student found with this Registration or Certificate Number.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(student, { status: 200 });
  } catch (error: any) {
    console.error("❌ Fetch Error:", error);
    return NextResponse.json(
      { message: "Server error while fetching student data" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ regNo: string }> },
) {
  try {
    await dbConnect();

    const body = await req.json();

    // Await the params
    const { regNo } = await params;

    // Update by finding either registrationNumber OR certificateNumber
    const updatedStudent = await Student.findOneAndUpdate(
      {
        $or: [{ registrationNumber: regNo }, { certificateNumber: regNo }],
      },
      body,
      { new: true },
    );

    if (!updatedStudent) {
      return NextResponse.json(
        { message: "Student not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedStudent, { status: 200 });
  } catch (error) {
    console.error("❌ Update Error:", error);
    return NextResponse.json(
      { message: "Failed to update student" },
      { status: 500 },
    );
  }
}

// DELETE - THIS WAS MISSING
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ regNo: string }> },
) {
  try {
    await dbConnect();
    const { regNo } = await params;

    const deletedStudent = await Student.findOneAndDelete({
      $or: [{ registrationNumber: regNo }, { certificateNumber: regNo }],
    });

    if (!deletedStudent) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Student deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}