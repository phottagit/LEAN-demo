import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, empId, departments, email, password, img } = body;

        if (!name || !empId || !departments || !email || !password || !img) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        await connectMongoDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Store the entire base64 image string in the database instead of writing to filesystem
        // This approach works in serverless environments like Vercel
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            empId,
            departments,
            email,
            password: hashedPassword,
            img: img // Store the full base64 image data
        });

        return NextResponse.json({ message: "User registered." }, { status: 201 });

    } catch (error) {
        console.error("Register API error:", error);
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}
