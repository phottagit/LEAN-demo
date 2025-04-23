import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
    // Await params before accessing its properties
    const filename = (await params).filename;
    
    try {
        // Define the path to your images directory
        const imagePath = path.join(process.cwd(), 'public', 'uploads', filename);
        
        // Check if the file exists
        if (!fs.existsSync(imagePath)) {
            console.error(`Image not found: ${imagePath}`);
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }
        
        // Read the file
        const imageBuffer = fs.readFileSync(imagePath);
        
        // Determine content type based on file extension
        const ext = path.extname(filename).toLowerCase();
        let contentType = 'image/jpeg'; // Default
        
        if (ext === '.png') contentType = 'image/png';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.webp') contentType = 'image/webp';
        
        // Return the image with appropriate headers
        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=86400'
            }
        });
    } catch (error) {
        console.error('Error serving image:', error, filename);
        return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
    }
}
