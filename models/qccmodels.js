import mongoose from 'mongoose';

const qccmodelsSchema = new mongoose.Schema({
  registrationDate: {
    type: Date,
    required: [true, 'Registration date is required'],
    default: Date.now
  },
  projectNumber: {
    type: String,
    required: [true, 'Project number is required'],
    unique: true
  },
  department: {
    type: String,
    required: [true, 'Department is required']
  },
  teamName: {
    type: String,
    required: [true, 'Team name is required']
  },
  projectName: {
    type: String,
    required: [true, 'Project name is required']
  },
  teamSlogan: {
    type: String
  },
  projectCategory: {
    type: String
  },
  members: {
    type: [String],
    required: [true, 'At least one team member is required']
  },
  advisors: {
    type: [String]
  },
  status: {
    type: String,
    default: 'On progress'
  },
  statusCategory: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a function to generate the next project number
qccmodelsSchema.statics.generateProjectNumber = async function() {
  const currentYear = new Date().getFullYear();
  const yearPrefix = `SMT-QCC-${currentYear}`;
  
  // Find the highest project number for the current year
  const highestProject = await this.findOne(
    { projectNumber: { $regex: `^${yearPrefix}` } },
    {},
    { sort: { projectNumber: -1 } }
  );
  
  let nextNumber = 1;
  
  if (highestProject) {
    // Extract the number part from the highest project number
    const match = highestProject.projectNumber.match(/(\d+)$/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }
  
  // Format the number with leading zeros (4 digits)
  const formattedNumber = nextNumber.toString().padStart(4, '0');
  return `${yearPrefix}-${formattedNumber}`;
};

const qccmodels = mongoose.models.qccmodels || mongoose.model('qccmodels', qccmodelsSchema);

export default qccmodels;