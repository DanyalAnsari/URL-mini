const mongoose = require('mongoose');
const { handlePasswordHashing } = require('../../auth/authentication');

// User Schema Definition
const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [16, 'Username cannot exceed 16 characters'],
    match: /^[0-9A-Za-z]{3,16}$/, // Alphanumeric between 3-16 char
  },
  Email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'Invalid email format'],
  },
  Password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  User_Role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
}, { timestamps: true });

// Pre-save middleware to hash the password
UserSchema.pre('save', async function (next) {
  const user = this;

  // Hash the password if it has been modified (or is new)
  if (!user.isModified('Password')) return next();

  try {
    user.Password = await handlePasswordHashing(user.Password)
    next();
  } catch (error) {
    next(error);
  }
});


// Ensure uniqueness of fields
UserSchema.index({ Email: 1 }, { unique: true });
UserSchema.index({ Username: 1 }, { unique: true });

// Model Creation
const User = mongoose.model('User', UserSchema);

module.exports = { User };
