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
    const filename = 'DailyKPIs.jpg'; // Always use the same filename
    
    // In Vercel production environment, we can't write to the filesystem
    if (process.env.VERCEL_ENV === 'production') {
      console.log('In production: Would save image if this was development');
      return NextResponse.json({ 
        success: true,
        path: `/${filename}`,
        note: 'Image upload simulated in production'
      });
    }
    
    // For development environment, save to filesystem
    try {
      // Ensure public directory exists
      const publicDir = path.join(process.cwd(), 'public');
      
      if (!fs.existsSync(publicDir)) {
        await mkdir(publicDir, { recursive: true });
      }
      
      // Save file directly to public directory with fixed name
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