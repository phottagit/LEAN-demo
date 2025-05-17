import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import sixsigmasmodels from '../../../../models/sixsigmasmodels'; // Import the sixsigmasmodels model

// GET all sixsigmas projects
export async function GET() {
  try {
    await connectMongoDB();
    const sixsigmas = await sixsigmasmodels.find({}).sort({ registrationDate: -1 }); // Sort by registrationDate in descending order
    return NextResponse.json({ success: true, data: sixsigmas }); // Return the sorted sixsigmas data
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST a new sixsigmas project
export async function POST(request) {
  try {
    
    const formData = await request.json();
    await connectMongoDB();

    // Validate required fields (optional but good practice)
    const requiredFields = [
      'registrationDate', 'projectleader', 'process', 'teammembers', 'sponser', 'projectName', 'problemstatement', 'projectObjective', 'projectbenefit', 'primarymetric', 'secondarymetric', 'projectresult', 'projectstatus', 'statusCategory'
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json({ success: false, message: `${field} is required.` }, { status: 400 });
      }
    }

    // Generate project number
    const projectNumber = await sixsigmasmodels.generateProjectNumber();
    const newProject = await sixsigmasmodels.create({

      ...formData,
      projectNumber,
      costsaving: formData.costsaving || 0, // ✅ Default to 0 if empty or undefined
      teammembers: Array.isArray(formData.teammembers) ? formData.teammembers : [],
      sponser: Array.isArray(formData.sponser) ? formData.sponser : [],
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

