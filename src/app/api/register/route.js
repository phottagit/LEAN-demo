import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';

export async function GET() {
  return NextResponse.json({ message: "Registration API is working" }, { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, empId, departments, email, password, img, role } = body;

    if (!name || !empId || !departments || !email || !password || !img || !role) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert base64 image to binary buffer
    const base64Data = img.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');

    const userData = {
      name,
      empId,
      departments,
      email,
      password: hashedPassword,
      img: buffer,  // <-- store image directly in MongoDB
      role,
    };

    const newUser = await User.create(userData);

    return NextResponse.json(
      {
        message: "User registered successfully.",
        userId: newUser._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while registering the user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
