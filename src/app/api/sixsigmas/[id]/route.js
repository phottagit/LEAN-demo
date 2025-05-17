import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongodb';
import sixsigmasmodels from '../../../../../models/sixsigmasmodels';
import bcrypt from 'bcryptjs';

// GET a single sixsigmas project
export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    
    const project = await sixsigmasmodels.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// CREATE a new sixsigmas project
export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();

    // Optional: validate the required fields here
    if (!body.title || !body.description) {
      return NextResponse.json(
        { success: false, message: 'Title and description are required.' },
        { status: 400 }
      );
    }

    const newProject = await sixsigmasmodels.create(body);

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


// UPDATE a sixsigmas project
export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    const body = await request.json();
    
    const updatedProject = await sixsigmasmodels.findByIdAndUpdate(
      id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!updatedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE a sixsigmas project
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    
    const deletedProject = await sixsigmasmodels.findByIdAndDelete(id);
    
    if (!deletedProject) {
      return NextResponse.json(
        { success: false, message: 'Project not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}