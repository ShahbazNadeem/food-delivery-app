import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const payload = await req.json();
    await mongoose.connect(connectionStr);
    let success = false;
    let deliveryBoy_Id;
    const orderObj = new orderSchema(payload)
    const result = await orderObj.save()
    if (result) {
        success = true;
    }
    return NextResponse.json({result, success})
}


// import { connectionStr } from "@/app/lib/db";
// import { orderSchema } from "@/app/lib/ordersModel";
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const payload = await req.json();
//     await mongoose.connect(connectionStr);

//     // 🔁 Convert resto_id to ObjectId if it's a string
//     const updatedOrderItems = payload.order.map(item => {
//       return {
//         ...item,
//         resto_id: mongoose.Types.ObjectId.isValid(item.resto_id)
//           ? new mongoose.Types.ObjectId(item.resto_id)
//           : undefined // optional: or handle invalid cases
//       };
//     });

//     payload.order = updatedOrderItems;

//     const orderObj = new orderSchema(payload);
//     const result = await orderObj.save();

//     return NextResponse.json({ result, success: true });
//   } catch (err) {
//     console.error("Order Save Error:", err);
//     return NextResponse.json({ success: false, error: err.message });
//   }
// }
