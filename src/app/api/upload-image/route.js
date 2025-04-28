import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ensure the directory exists
    const publicDir = path.join(process.cwd(), 'public');
    try {
      await fs.access(publicDir);
    } catch (error) {
      // Directory doesn't exist, create it
      await fs.mkdir(publicDir, { recursive: true });
    }
    
    // Save to public folder
    const filePath = path.join(publicDir, 'DailyKPIs.jpg');
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      error: 'Failed to upload image', 
      details: error.message 
    }, { status: 500 });
  }
}
