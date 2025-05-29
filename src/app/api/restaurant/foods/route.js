import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import { NextResponse } from "next/server"

export async function POST(res) {
    const payload = await res.json()
    let result;
    let success = false
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    const food = new foodSchema(payload)
    result = await food.save()
    if (result) { success = true }
    return NextResponse.json({ result, success })
}