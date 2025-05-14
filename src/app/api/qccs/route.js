import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import qccmodels from '../../../../models/qccmodels';

// GET all QCC projects
export async function GET() {
  try {
    await connectMongoDB();
    const projects = await qccmodels.find({}).sort({ registrationDate: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST a new QCC project
export async function POST(request) {
  try {
    await connectMongoDB();
    
    const body = await request.json();
    
    // Generate project number automatically
    const projectNumber = await qccmodels.generateProjectNumber();
    
    // Create new project with the generated number
    const newProject = await qccmodels.create({
      ...body,
      projectNumber
    });
    
    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}