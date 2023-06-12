import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  story: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

storySchema.statics.scheduleStoryDeletion = function () {
  const oneDayAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);

  return this.deleteMany({ createdAt: { $lt: oneDayAgo } });
};

const Story = mongoose.model('Story', storySchema);

export default Story;
