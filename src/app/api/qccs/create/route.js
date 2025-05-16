import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongodb';
import qccmodels from '../../../../../models/qccmodels';

// CREATE a new QCC project
export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();

    // Validate required fields
    const {
      registrationDate,
      department,
      teamName,
      projectName,
      teamSlogan,
      projectCategory,
      members,
      advisors,
      status,
      statusCategory,
    } = body;

    if (
      !registrationDate ||
      !department ||
      !teamName ||
      !projectName ||
      !teamSlogan ||
      !projectCategory ||
      !members ||
      !advisors ||
      !status ||
      !statusCategory
    ) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled.' },
        { status: 400 }
      );
    }

    // Convert members and advisors to arrays if they are strings
    const memberArray = typeof members === 'string' ? members.split('\n').filter(Boolean) : members;
    const advisorArray = typeof advisors === 'string' ? advisors.split('\n').filter(Boolean) : advisors;

    // Generate project number
    const projectNumber = await qccmodels.generateProjectNumber();

    const newProject = await qccmodels.create({
      registrationDate,
      department,
      teamName,
      projectName,
      teamSlogan,
      projectCategory,
      members: memberArray,
      advisors: advisorArray,
      status,
      statusCategory,
      projectNumber,
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
