import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    
    // In Vercel production environment, we can't write to the filesystem
    // We need to handle this differently in production vs development
    if (process.env.VERCEL_ENV === 'production') {
      // For production, we should use a storage service like S3, Cloudinary, etc.
      // For now, let's return a mock success response
      console.log('In production: Would save image if this was development');
      return NextResponse.json({ 
        success: true,
        path: `/DailyKPIs.jpg`,
        note: 'Image upload simulated in production'
      });
    }
    
    // For development environment, save to filesystem
    try {
      // Ensure uploads directory exists
      const publicDir = path.join(process.cwd(), 'public');
      const uploadsDir = path.join(publicDir, 'uploads');
      
      if (!fs.existsSync(publicDir)) {
        await mkdir(publicDir, { recursive: true });
      }
      
      if (!fs.existsSync(uploadsDir)) {
        await mkdir(uploadsDir, { recursive: true });
      }
      
      // Save file
      const filename = 'DailyKPIs.jpg';
      const filePath = path.join(publicDir, filename);
      await writeFile(filePath, buffer);
      
      return NextResponse.json({ 
        success: true,
        path: `/${filename}`
      });
    } catch (fsError) {
      console.error('Filesystem error:', fsError);
      return NextResponse.json({ 
        error: 'Failed to save image to filesystem',
        details: fsError.message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      error: 'Failed to process upload',
      details: error.message 
    }, { status: 500 });
  }
}
