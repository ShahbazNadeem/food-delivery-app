import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    const { id } = await content.params;
    let success = false;
    // console.log(id)
    await mongoose.connect(connectionStr)
    const result = await foodSchema.find({resto_id:"68355403026f3df17a4de710"})
    if (result) { success = true }
    return NextResponse.json({ result, success });
}

