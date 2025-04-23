import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');
        
        if (!filename) {
            return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
        }
        
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const imagePath = path.join(uploadsDir, filename);
        
        const exists = fs.existsSync(imagePath);
        const dirExists = fs.existsSync(uploadsDir);
        
        // List all files in the uploads directory if it exists
        let files = [];
        if (dirExists) {
            files = fs.readdirSync(uploadsDir);
        }
        
        return NextResponse.json({ 
            exists, 
            dirExists,
            imagePath,
            uploadsDir,
            files
        });
    } catch (error) {
        console.error('Error checking image:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}