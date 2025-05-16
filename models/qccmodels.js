import mongoose from 'mongoose';
import { connectMongoDB } from '../lib/mongodb';

const qccmodelsSchema = new mongoose.Schema({
  registrationDate: {
    type: Date,
    required: [true, 'Registration date is required'],
    default: Date.now,
  },
  projectNumber: {
    type: String,
    required: [true, 'Project number is required'],
    unique: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
  },
  teamName: {
    type: String,
    required: [true, 'Team name is required'],
  },
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
  },
  teamSlogan: {
    type: String,
    required: [true, 'Team slogan is required'],
  },
  projectCategory: {
    type: String,
    required: [true, 'Project category is required'],
  },
  members: {
    type: [String],
    required: [true, 'At least one team member is required'],
  },
  advisors: {
    type: [String],
    required: [true, 'At least one advisor is required'],
  },
  status: {
    type: String,
    default: 'On progress',
    required: [true, 'Status is required'],
  },
  statusCategory: {
    type: String,
    required: [true, 'Status category is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Static method to generate the next project number
qccmodelsSchema.statics.generateProjectNumber = async function () {
  await connectMongoDB();
  const currentYear = new Date().getFullYear();
  const yearPrefix = `SMT-QCC-${currentYear}`;

  const highestProject = await this.findOne(
    { projectNumber: { $regex: `^${yearPrefix}` } },
    {},
    { sort: { projectNumber: -1 } }
  );

  let nextNumber = 1;

  if (highestProject) {
    const match = highestProject.projectNumber.match(/(\d+)$/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  const formattedNumber = nextNumber.toString().padStart(4, '0');
  return `${yearPrefix}-${formattedNumber}`;
};

const qccmodels = mongoose.models.qccmodels || mongoose.model('qccmodels', qccmodelsSchema);
export default qccmodels;
