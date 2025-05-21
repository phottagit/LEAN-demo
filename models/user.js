import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  empId: { type: String, required: true },
  departments: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img: { type: Buffer, required: true }, // store binary image
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

// Check if the model is already defined to prevent overwriting
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;