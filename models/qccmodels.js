import mongoose from 'mongoose';
import { connectMongoDB } from '../lib/mongodb';

const qccmodelsSchema = new mongoose.Schema({
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  projectNumber: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  teamSlogan: {
    type: String,
    required: true,
  },
  projectCategory: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  advisors: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'On progress',
  },
  statusCategory: {
    type: String,
    required: true,
    default: 'Plan',
  },
  costsaving: {
    type: Number,
    default: 0,
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
