const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    default: false,
    type: Boolean
  }
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.pre('save', async function() {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 3600
  });
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error();
    }
    return user;
  } catch (error) {
    throw new Error('Not Authorized');
  }
};

const User = mongoose.model('user', UserSchema);

module.exports = User;
