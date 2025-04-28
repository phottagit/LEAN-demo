import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectMongoDB();
        
        // Get all collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();
        const collectionNames = collections.map(c => c.name);
        
        return NextResponse.json({ 
            status: 'success', 
            message: 'MongoDB connection successful',
            database: mongoose.connection.db.databaseName,
            collections: collectionNames
        });
    } catch (error) {
        console.error('Database test error:', error);
        return NextResponse.json({ 
            status: 'error', 
            message: 'MongoDB connection failed',
            error: error.message
        }, { status: 500 });
    }
}