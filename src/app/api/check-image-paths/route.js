import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename') || 'DailyKPIs.jpg';
        
        // Check public directory
        const publicDir = path.join(process.cwd(), 'public');
        const publicExists = fs.existsSync(publicDir);
        
        // Check uploads directory
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const uploadsExists = fs.existsSync(uploadsDir);
        
        // Create uploads directory if it doesn't exist
        if (!uploadsExists && publicExists) {
            try {
                fs.mkdirSync(uploadsDir, { recursive: true });
            } catch (err) {
                console.error('Error creating uploads directory:', err);
            }
        }
        
        // Check specific image paths
        const standardPath = path.join(publicDir, filename);
        const standardExists = fs.existsSync(standardPath);
        
        const uploadsPath = path.join(uploadsDir, filename);
        const uploadsImageExists = fs.existsSync(uploadsPath);
        
        // List files in uploads directory
        let uploadFiles = [];
        if (uploadsExists) {
            uploadFiles = fs.readdirSync(uploadsDir);
        }
        
        return NextResponse.json({
            publicDirExists: publicExists,
            uploadsDirExists: uploadsExists,
            standardImageExists: standardExists,
            uploadsImageExists: uploadsImageExists,
            standardPath,
            uploadsPath,
            uploadFiles
        });
    } catch (error) {
        console.error('Error checking image paths:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}