// app/api/admin/verify/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // <-- Update this path to where your db file is
import { Config } from "@/models/AdminPassword";

export async function POST(request) {
  try {
    const { inputPassword } = await request.json();
    
    // Use your existing connection function
    await dbConnect();

    // Find settings or create them with the exact matching ID
    const settings = await Config.findOne({ _id: "admin_settings" }) || 
                     await Config.create({ _id: "admin_settings", password: "admin123" });
    
    if (settings.password === inputPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    console.error("Database Error:", error.message);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}