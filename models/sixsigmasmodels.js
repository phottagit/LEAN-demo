import mongoose from 'mongoose'; // Import the mongoose module
import { connectMongoDB } from '../lib/mongodb'; // Import the connectMongoDB function from the mongodb module

const sixsigmasmodelsSchema = new mongoose.Schema({
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
  projectleader: {
    type: String,
    required: true,
  },
  process: {
    type: String,
    required: true,
  },
  teammembers: {
    type: [String],
    required: true,
  },
  sponser: {
    type: [String],
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  problemstatement: {
    type: String,
    required: true,
  },
  projectObjective: {
    type: String,
    required: true,
  },
  projectbenefit: {
    type: String,
    required: true,
  },
  primarymetric: {
    type: String,
    required: true,
  },
  secondarymetric: {
    type: String,
    required: true,
  },
  projectresult: {
    type: String,
    required: true,
  },
  projectstatus: {
    type: String,
    required: true,
    default: 'In progress',
  },
  statusCategory: {
    type: String,
    required: true,
    default: 'Define',
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
sixsigmasmodelsSchema.statics.generateProjectNumber = async function () {
  await connectMongoDB();
  const currentYear = new Date().getFullYear();
  const yearPrefix = `SMT-Sixsigmas-${currentYear}`;

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

const sixsigmasmodels = mongoose.models.sixsigmasmodels || mongoose.model('sixsigmasmodels', sixsigmasmodelsSchema);
export default sixsigmasmodels;
