import mongoose from 'mongoose';

let isConnected = false;

export const connectMongoDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return true;
    }

    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined in environment variables');
        throw new Error('MONGODB_URI is not defined');
    }

    try {
        // Remove deprecated options
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        isConnected = true;
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
}
