import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    const { id } = await content.params;
    let success = false;
    // console.log(id)
    await mongoose.connect(connectionStr)
    const result = await foodSchema.find({ resto_id: id })
    if (result) { success = true }
    return NextResponse.json({ result, success });
}

export async function DELETE(req, res) {
    const { id } = await res.params;
    let success = false;
    await mongoose.connect(connectionStr)
    let result = await foodSchema.deleteOne({ _id: id })
    if (result.deletedCount > 0) { success = true }
    return NextResponse.json({ result, success })

}