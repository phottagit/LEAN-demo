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

        // Extract file extension
        const matches = img.match(/^data:image\/([a-zA-Z]+);base64,/);
        if (!matches || matches.length < 2) {
            return NextResponse.json({ message: "Invalid image format" }, { status: 400 });
        }

        const extension = matches[1];
        const imgName = `img_${Date.now()}.${extension}`;

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        
        // Save the image to filesystem
        const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(path.join(uploadsDir, imgName), buffer);

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            empId,
            departments,
            email,
            password: hashedPassword,
            img: imgName // Only store the image name
        });

        return NextResponse.json({ message: "User registered." }, { status: 201 });

    } catch (error) {
        console.error("Register API error:", error);
        return NextResponse.json({ message: "An error occurred while registering the user." }, { status: 500 });
    }
}
