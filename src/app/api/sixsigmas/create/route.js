import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../../lib/mongodb';
import sixsigmas from '../../../../../models/sixsigmasmodels';

// CREATE a new sixsigmas project
export async function POST(request) {
  try {
    await connectMongoDB();
    const body = await request.json();

    // Validate required fields
    const {
      registrationDate,
      projectleader,
      process,
      teammembers,
      coach,
      sponser,
      projectName,
      projectstatus,
      statusCategory,
    } = body;

    if (
      !registrationDate ||
      !projectleader ||
      !process ||
      !teammembers ||
      !coach ||
      !sponser ||
      !projectName ||
      !projectstatus ||
      !statusCategory 
    ) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled.' },
        { status: 400 }
      );
    }

    const projectleaderArray = typeof projectleader === 'string' ? projectleader.split('\n').filter(Boolean) : projectleader;
    const teammembersArray = typeof teammembers === 'string' ? teammembers.split('\n').filter(Boolean) : teammembers;
    const sponserArray = typeof sponser === 'string' ? sponser.split('\n').filter(Boolean) : sponser;
    const coachArray = typeof coach === 'string' ? coach.split('\n').filter(Boolean) : coach;

    // Generate project number
    const projectNumber = await sixsigmas.generateProjectNumber();

    const newProject = await sixsigmas.create({
      projectNumber,
      registrationDate,
      projectleader: projectleaderArray,
      process,
      teammembers: teammembersArray,
      coach: coachArray,
      sponser: sponserArray,
      projectName,
      projectstatus,
      statusCategory,
      
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
