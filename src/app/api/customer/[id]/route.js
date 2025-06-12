import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
    const { id } = await content.params;
    let success = false;
    await mongoose.connect(connectionStr)
    const details = await restaurantSchema.findOne({ _id: id })
    const foodItems = await foodSchema.find({ resto_id: id })
    if (details) { success = true }
    return NextResponse.json({ details, foodItems, success })
}