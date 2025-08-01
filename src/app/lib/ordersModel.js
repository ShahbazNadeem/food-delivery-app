import mongoose from "mongoose";

const ordersModel = new mongoose.Schema({
    user_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    order: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            itemName: String,
            itemPrice: Number,
            itemImg: String,
            itemDecription: String,
            quantity: Number,
            resto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurants' }

        }
    ],
    deliveryStatus: { type: String, default: "pending" },
    amount: { type: Number, required: true },
    deliveryBoy_Id: { type: String, ref: 'deliveryboys' },
}, {
    timestamps: true
});

export const orderSchema = mongoose.models?.orders || mongoose.model("orders", ordersModel);
