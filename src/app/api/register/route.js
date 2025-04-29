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
        
        // Extract base64 data
        const base64Data = img.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');
        
        // Generate a unique filename
        const fileExt = 'jpg'; // Default extension
        const timestamp = Date.now();
        const filename = `user_${timestamp}.${fileExt}`;
        
        // Save to a tracked directory that will be committed to GitHub
        // Using 'public/user-images' which should be tracked in git
        const publicDir = path.join(process.cwd(), 'public');
        const userImagesDir = path.join(publicDir, 'user-images');
        
        try {
            // Ensure directories exist
            if (!fs.existsSync(publicDir)) {
                await mkdir(publicDir, { recursive: true });
            }
            
            if (!fs.existsSync(userImagesDir)) {
                await mkdir(userImagesDir, { recursive: true });
            }
            
            // Save file to the tracked directory
            const filePath = path.join(userImagesDir, filename);
            await writeFile(filePath, buffer);
            
            console.log(`Image saved to: ${filePath}`);
            console.log(`Remember to commit this file to GitHub for Vercel deployment`);
            
        } catch (fsError) {
            console.error('Filesystem error:', fsError);
            return NextResponse.json({ 
                error: 'Failed to save image to filesystem',
                details: fsError.message 
            }, { status: 500 });
        }
        
        // Create user with the image filename
        const userData = {
            name,
            empId,
            departments,
            email,
            password: hashedPassword,
            img: `user-images/${filename}`, // Store relative path from public directory
            role: "user"
        };
        
        console.log("Creating user with data:", {
            ...userData,
            password: "[REDACTED]",
            img: userData.img
        });
        
        const newUser = await User.create(userData);
        console.log("User created successfully with ID:", newUser._id);

        return NextResponse.json({ 
            message: "User registered successfully.", 
            userId: newUser._id,
            note: "Image saved locally. Remember to commit to GitHub for Vercel deployment."
        }, { status: 201 });
    } catch (error) {
        console.error("Register API error:", error);
        return NextResponse.json({ 
            message: "An error occurred while registering the user.",
            error: error.message
        }, { status: 500 });
    }
}
