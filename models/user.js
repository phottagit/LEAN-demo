import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    empId: String,
    departments: String,
    email: { type: String, unique: true },
    password: String,
    img: String, // Must be a string if you're saving a URL or base64
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
