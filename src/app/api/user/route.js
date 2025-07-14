import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { NextResponse } from "next/server"
import { userSchema } from "@/app/lib/userModel";
import bcrypt from 'bcryptjs';


export async function POST(req) {
    try {
        const payload = await req.json();
        let result;
        let success = false;

        await mongoose.connect(connectionStr);

        if (payload.login) {
            // login flow
            const user = await userSchema.findOne({ email: payload.email });

            if (!user) {
                result = "User not found";
                success = false;
            } else {
                const isPasswordValid = await bcrypt.compare(payload.password, user.password);

                if (!isPasswordValid) {
                    result = "Invalid password";
                    success = false;
                } else {
                    result = user;
                    success = true;
                }
            }
        }
        else {
            // Signup flow
            const existingUser = await userSchema.findOne({ email: payload.email });

            if (existingUser) {
                success = false;
                result = "User already exists";
            } else {
                const hashedPassword = await bcrypt.hash(payload.password, 10);
                payload.password = hashedPassword;
                const newUser = new userSchema(payload);
                result = await newUser.save();
                success = true;
            }
        }

        return NextResponse.json({ result, success });

    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
