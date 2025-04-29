import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('filename');
        
        if (!filename) {
            return NextResponse.json({ exists: false, error: 'No filename provided' }, { status: 400 });
        }
        
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        const imagePath = path.join(uploadsDir, filename);
        
        const exists = fs.existsSync(imagePath);
        
        return NextResponse.json({ 
            exists,
            filename,
            path: imagePath
        });
    } catch (error) {
        console.error('Error checking if image exists:', error);
        return NextResponse.json({ 
            exists: false, 
            error: error.message 
        }, { status: 500 });
    }
}