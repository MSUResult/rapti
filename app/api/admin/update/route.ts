// app/api/admin/update/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";// <-- Update this path to where your db file is
import { Config } from "@/models/AdminPassword";

export async function POST(request) {
  try {
    const { oldPassword, newPassword } = await request.json();
    
    // Use your existing connection function
    await dbConnect();

    const settings = await Config.findOne({ _id: "admin_settings" });
    
    if (!settings || settings.password !== oldPassword) {
      return NextResponse.json({ success: false, error: "Incorrect old password" });
    }

    await Config.updateOne({ _id: "admin_settings" }, { password: newPassword });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}