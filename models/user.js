import mongoose from 'mongoose';
import { connectMongoDB } from '../lib/mongodb';

const UserSchema = new mongoose.Schema({
  name: String,
  empId: String,
  departments: [String],
  email: { type: String, unique: true },
  password: String,
  img: Buffer, // Store image as binary buffer (optional)
  imgType: String, // Store image type (optional)
  imgFilename: String, // Store image filename (optional)
  role: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;