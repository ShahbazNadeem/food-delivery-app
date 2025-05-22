import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { restaurantSchema } from "@/app/lib/restaurantsModel"
import { NextResponse } from "next/server"

export async function GET() {
  await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
  const data = await restaurantSchema.find()
  console.log(data)
  return NextResponse.json({ result: data })
}
