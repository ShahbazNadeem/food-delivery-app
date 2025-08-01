import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnersModel";

export async function POST(req) {
    try {
        const payload = await req.json();
        await mongoose.connect(connectionStr);

        // Find user by email
        const user = await deliveryPartnersSchema.findOne({ mobile: payload.mobile });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" });
        }

        // Compare password securely
        const isPasswordValid = await bcrypt.compare(payload.password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: "Invalid credentials" });
        }

        // Remove password before sending response
        const { password, ...userWithoutPassword } = user.toObject();

        return NextResponse.json({ success: true, user: userWithoutPassword });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
}
