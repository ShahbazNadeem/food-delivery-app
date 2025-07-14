import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { restaurantSchema } from "@/app/lib/restaurantsModel"
import { NextResponse } from "next/server"

export async function GET() {
  await mongoose.connect(connectionStr)
  const data = await restaurantSchema.find()
  return NextResponse.json({ result: data })
}

export async function POST(req) {
  try {
    let payload = await req.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    if (payload.login) {
      // login flow
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (result) { success = true }
    } else {
      // signUp flow
      let restaurant = new restaurantSchema(payload)
      result = await restaurant.save()
      if (result) { success = true }
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
