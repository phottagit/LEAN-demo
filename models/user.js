import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    empId: {
        type: String,
        required: [true, 'Employee ID is required'],
    },
    departments: {
        type: String,
        required: [true, 'Department is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
        required: [true, 'Image is required'],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Check if the model is already defined to prevent overwriting
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;