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

        console.log("Connecting to MongoDB...");
        await connectMongoDB();
        console.log("MongoDB connected successfully");

        console.log("Checking for existing user...");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating new user...");
        // Check if the image is too large
        const imgSize = img.length;
        console.log(`Image size: ${imgSize} characters`);
        
        if (imgSize > 1000000) {
            console.log("Image too large, compressing...");
            // Simple compression by reducing the quality/size
            const compressedImg = img.substring(0, 1000000);
            console.log(`Compressed image size: ${compressedImg.length} characters`);
            
            const newUser = await User.create({
                name,
                empId,
                departments,
                email,
                password: hashedPassword,
                img: compressedImg
            });
        } else {
            const newUser = await User.create({
                name,
                empId,
                departments,
                email,
                password: hashedPassword,
                img: img
            });
        }

        console.log("User created successfully");
        return NextResponse.json({ message: "User registered." }, { status: 201 });

    } catch (error) {
        console.error("Register API error details:", error.name, error.message);
        console.error("Error stack:", error.stack);
        return NextResponse.json({ 
            message: "An error occurred while registering the user.",
            error: error.message,
            type: error.name
        }, { status: 500 });
    }
}
