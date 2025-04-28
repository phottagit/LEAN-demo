import { NextResponse } from 'next/server';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Generate a unique filename with timestamp to prevent caching
    const timestamp = Date.now();
    const filename = `DailyKPIs_${timestamp}.jpg`;
    const filePath = path.join(uploadsDir, filename);
    
    // Save to public/uploads folder
    await fsPromises.writeFile(filePath, buffer);
    
    // Also save a copy with the standard name for backward compatibility
    const standardPath = path.join(process.cwd(), 'public', 'DailyKPIs.jpg');
    await fsPromises.writeFile(standardPath, buffer);
    
    return NextResponse.json({ 
      success: true,
      filename: filename,
      timestamp: timestamp
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      error: 'Failed to upload image', 
      details: error.message 
    }, { status: 500 });
  }
}
