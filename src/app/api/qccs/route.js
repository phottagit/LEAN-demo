import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import QccModel from '../../../../models/qccmodels';

// GET all QCC projects
export async function GET() {
  try {
    await connectMongoDB();
    const qccs = await QccModel.find({}).sort({ registrationDate: -1 });
    return NextResponse.json({ success: true, data: qccs });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST a new QCC project
export async function POST(request) {
  try {
    
    const formData = await request.json();
    await connectMongoDB();

    // Validate required fields (optional but good practice)
    const requiredFields = [
      'registrationDate', 'department', 'teamName', 'projectName',
      'teamSlogan', 'projectCategory', 'members', 'advisors', 'status', 'statusCategory'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required.` }, { status: 400 });
      }
    }

    // Generate project number
    const projectNumber = await QccModel.generateProjectNumber();
    const newProject = await QccModel.create({

      ...formData,
      projectNumber,
      costsaving: formData.costsaving || 0, // ✅ Default to 0 if empty
      members: Array.isArray(formData.members) ? formData.members : [],
      advisors: Array.isArray(formData.advisors) ? formData.advisors : [],
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

