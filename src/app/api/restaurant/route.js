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
    let result = restaurant.save()
    // console.log("Payload received:", payload);
    return NextResponse.json({ result, sucess: true });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

// import mongoose from "mongoose";
// import { connectionStr } from "@/app/lib/db";
// import { restaurantSchema } from "@/app/lib/restaurantsModel";
// import { NextResponse } from "next/server";

// let isConnected = false;

// const connectDB = async () => {
//   if (!isConnected) {
//     // await mongoose.connect(connectionStr, {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // });
//     await mongoose.connect(connectionStr)
//     isConnected = true;
//     console.log("✅ MongoDB connected");
//   }
// };

// export const GET = async () => {
//   try {
//     await connectDB();
//     const data = await restaurantSchema.find();
//     return NextResponse.json({ result: data });
//   } catch (error) {
//     console.error("❌ Error fetching restaurants:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch restaurants" },
//       { status: 500 }
//     );
//   }
// };


// import mongoose from "mongoose";
// import { connectionStr } from "@/app/lib/db";
// import { restaurantSchema } from "@/app/lib/restaurantsModel";
// import { NextResponse } from "next/server";

// let isConnected = false;

// const connectDB = async () => {
//   if (!isConnected) {
//     await mongoose.connect(connectionStr);
//     isConnected = true;
//     console.log("✅ MongoDB connected");
//   }
// };

// export const GET = async () => {
//   try {
//     await connectDB();
//     const data = await restaurantSchema.find();
//     return NextResponse.json({ result: data });
//   } catch (error) {
//     console.error("❌ Error fetching restaurants:", error.message);
//     return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: 500 });
//   }
// };
