import mongoose from "mongoose"

const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    mobile: String,
    password: String,
    city: String,
    address: String,
    // contact: String,
})

export const deliveryPartnersSchema = mongoose.models?.deliveryPartners || mongoose.model("deliveryPartners", deliveryPartnersModel)