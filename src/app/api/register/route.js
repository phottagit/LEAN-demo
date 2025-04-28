import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

// Make sure both GET and POST methods are properly exported
export async function GET() {
  return NextResponse.json({ message: "Registration API is working" }, { status: 200 });
}

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

        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Check if the image is too large
        const imgSize = img.length;
        
        if (imgSize > 1000000) {
            // Simple compression by reducing the quality/size
            imageToStore = img.substring(0, 1000000);
        }
        
        await User.create({
            name,
            empId,
            departments,
            email,
            password: hashedPassword,
            img: imageToStore
        });

        return NextResponse.json({ message: "User registered." }, { status: 201 });

    } catch (error) {
        console.error("Register API error:", error.message);
        return NextResponse.json({ 
            message: "An error occurred while registering the user.",
            error: error.message
        }, { status: 500 });
    }
}
