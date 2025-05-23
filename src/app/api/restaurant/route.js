import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { restaurantSchema } from "@/app/lib/restaurantsModel"
import { NextResponse } from "next/server"

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true })
  const data = await restaurantSchema.find()
  console.log(data)
  return NextResponse.json({ result: data })
}

export async function POST(req) {
  try {
    let payload = await req.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let restaurant = new restaurantSchema(payload)
    restaurant.save()
    console.log("Payload received:", payload);
    return NextResponse.json({ result: payload, success: true });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
