import mongoose from "mongoose"

const uerModel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    city: String,
    address: String,
    contact: String,
})

export const userSchema = mongoose.models?.users || mongoose.model("users", uerModel)