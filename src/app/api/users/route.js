import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';

export async function GET() {
    try {
        await connectMongoDB();
        
        // Get all users, sorted by creation date (newest first)
        const users = await User.find({})
            .sort({ createdAt: -1 })
            .select('name email empId departments role createdAt')
            .limit(10);
        
        if (!users || users.length === 0) {
            return NextResponse.json({ 
                message: "No users found in the database",
                count: 0
            });
        }
        
        return NextResponse.json({ 
            message: "Users retrieved successfully",
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error("Error retrieving users:", error);
        return NextResponse.json({ 
            message: "An error occurred while retrieving users",
            error: error.message
        }, { status: 500 });
    }
}