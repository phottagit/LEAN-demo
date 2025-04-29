import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import bcrypt from 'bcryptjs';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

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

        // Ensure MongoDB connection is established
        await connectMongoDB();
        
        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Generate a short unique filename for the image
        const fileExt = 'jpg'; // Default extension
        const randomName = crypto.randomBytes(8).toString('hex');
        const filename = `${randomName}.${fileExt}`;
        
        // Save image to filesystem
        let imageFilename;
        
        if (process.env.VERCEL_ENV === 'production') {
            // In production, we can't write to filesystem
            // Just store the short filename and handle this differently
            imageFilename = filename;
            console.log('In production: Would save image if this was development');
        } else {
            // For development, save to filesystem
            try {
                // Extract base64 data
                const base64Data = img.split(';base64,').pop();
                const buffer = Buffer.from(base64Data, 'base64');
                
                // Ensure uploads directory exists
                const publicDir = path.join(process.cwd(), 'public');
                const uploadsDir = path.join(publicDir, 'uploads');
                
                if (!fs.existsSync(publicDir)) {
                    await mkdir(publicDir, { recursive: true });
                }
                
                if (!fs.existsSync(uploadsDir)) {
                    await mkdir(uploadsDir, { recursive: true });
                }
                
                // Save file
                const filePath = path.join(uploadsDir, filename);
                await writeFile(filePath, buffer);
                imageFilename = filename;
                
                console.log(`Image saved to: ${filePath}`);
            } catch (fsError) {
                console.error('Filesystem error:', fsError);
                return NextResponse.json({ 
                    error: 'Failed to save image to filesystem',
                    details: fsError.message 
                }, { status: 500 });
            }
        }
        
        // Create user with the image filename instead of the full base64 string
        const userData = {
            name,
            empId,
            departments,
            email,
            password: hashedPassword,
            img: imageFilename, // Store only the filename
            role: "user"
        };
        
        console.log("Creating user with data:", {
            ...userData,
            password: "[REDACTED]",
            img: imageFilename
        });
        
        const newUser = await User.create(userData);
        console.log("User created successfully with ID:", newUser._id);

        return NextResponse.json({ 
            message: "User registered successfully.", 
            userId: newUser._id 
        }, { status: 201 });

    } catch (error) {
        console.error("Register API error:", error);
        return NextResponse.json({ 
            message: "An error occurred while registering the user.",
            error: error.message
        }, { status: 500 });
    }
}