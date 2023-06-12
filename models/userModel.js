import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      max: [15, 'uername must be 15 characters or less'],
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      required: true,
    },

    followers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    postsQuantity: Number,
    totalFollowers: Number,
    totalFollowing: Number,
    bio: String,
    saved: Array,
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/dljzenvs4/image/upload/v1683693369/gh-fitness/i3memijbquqil4id48no.jpg',
    },

    passwordResetToken: String,
    resetTokenExpiresAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//virtuals
userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
});

userSchema.virtual('stories', {
  ref: 'Story',
  localField: '_id',
  foreignField: 'user',
});

// pre save middleware for encrypting password
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  this.password = bcrypt.hashSync(this.password, 14);
  next();
});

// schema mehtod for checking is password is correct
userSchema.methods.isCorrect = async function (password, currentPassword) {
  return await bcrypt.compare(password, currentPassword);
};

//setting password reset token
userSchema.methods.createResetToken = function () {
  const string = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(string)
    .digest('hex');

  this.resetTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  return string;
};

const User = mongoose.model('User', userSchema);

export default User;
