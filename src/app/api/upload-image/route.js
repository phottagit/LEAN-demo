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
    
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    // Save file with timestamp to avoid caching issues
    const filename = 'DailyKPIs.jpg';
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    
    return NextResponse.json({ 
      success: true,
      path: `/uploads/${filename}`
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
