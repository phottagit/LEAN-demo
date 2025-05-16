import { NextResponse } from 'next/server';
import { connectMongoDB } from '../../../../lib/mongodb';
import qccmodels from '../../../../models/qccmodels';

// MongoDB connection
const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// POST handler
export async function POST(req) {
  try {
    await connectMongoDB();
    const body = await req.json();

    // Convert members and advisors from string to array
    const members = body.members.split('\n').map((s) => s.trim()).filter(Boolean);
    const advisors = body.advisors ? body.advisors.split('\n').map((s) => s.trim()).filter(Boolean) : [];

    // Generate project number
    const projectNumber = await qccmodels.generateProjectNumber();

    const newProject = new qccmodels({
      ...body,
      members,
      advisors,
      projectNumber,
    });

    const savedProject = await newProject.save();

    return NextResponse.json({ success: true, data: savedProject }, { status: 201 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}