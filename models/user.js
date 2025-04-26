import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    empId: String,
    departments: String,
    email: { type: String, unique: true },
    password: String,
    img: { type: String, maxlength: 5000000 }, // Increased size limit for base64 images
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
