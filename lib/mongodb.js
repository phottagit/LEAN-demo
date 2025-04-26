import mongoose from 'mongoose';
import { connectVercelMongoDB } from './vercel';

export const connectMongoDB = async () => {
    try {
        // Check if we're running on Vercel
        if (process.env.VERCEL) {
            return await connectVercelMongoDB();
        }
        
        // Standard connection for local development
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        }
        
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}
