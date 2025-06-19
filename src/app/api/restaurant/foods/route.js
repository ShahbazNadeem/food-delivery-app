import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        const result = await foodSchema.find();
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error fetching food items:", error);
        return NextResponse.json({ success: false, error: "Something went wrong!" });
    }
}

export async function POST(res) {
    const payload = await res.json()
    let result;
    let success = false
    await mongoose.connect(connectionStr)
    const food = new foodSchema(payload)
    result = await food.save()
    if (result) { success = true }
    return NextResponse.json({ result, success })
}