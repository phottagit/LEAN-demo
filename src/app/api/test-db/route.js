import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';

export async function GET() {
    try {
        await connectMongoDB();
        
        // Count users in the database
        const userCount = await User.countDocuments();
        
        return NextResponse.json({ 
            status: 'success', 
            message: 'Database connection successful',
            userCount: userCount
        });
    } catch (error) {
        console.error('Database test error:', error);
        return NextResponse.json({ 
            status: 'error', 
            message: 'Database connection failed',
            error: error.message
        }, { status: 500 });
    }
}
