import mongoose from "mongoose";
import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { deliveryPartnersSchema } from "@/app/lib/deliveryPartnersModel";

export async function POST(req) {
    const payload = await req.json();
    let success = false;
    await mongoose.connect(connectionStr);
    const user = new deliveryPartnersSchema(payload);
    const result = await user.save();
    if (result) { success = true };
    return NextResponse.json({ result, success })
}

// 56