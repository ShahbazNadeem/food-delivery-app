import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    let queryParams = req.nextUrl.searchParams
    let filter = {}
    let success = false
    if (queryParams.get("location")) {
        let city = queryParams.get("location")
        filter = { city: { $regex: new RegExp(city, "i") } } // case insesitive for search in small or capital letters
    } else if (queryParams.get("restaurant")) {
        let name = queryParams.get("restaurant")
        filter = { name: { $regex: new RegExp(name, "i") } } // case insesitive for search in small or capital letters
    }
    await mongoose.connect(connectionStr)
    let result = await restaurantSchema.find(filter).select('-password -__v'); //password and __v cannot be sent to client side for sequerty
    if (result) { success = true }
    return NextResponse.json({ result, success })
}