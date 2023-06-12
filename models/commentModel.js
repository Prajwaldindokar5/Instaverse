import mongoose from 'mongoose';
import Post from './postModel.js';

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    post: {
      type: mongoose.Schema.ObjectId,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// calculating total no of comments and inserting into comment quantity in post
commentSchema.statics.calcCommentQuantity = async function (postId) {
  const results = await this.aggregate([
    { $match: { post: postId } },
    {
      $group: {
        _id: '$post',
        total: { $sum: 1 },
      },
    },
  ]);

  await Post.findByIdAndUpdate(postId, {
    commentsQuantity: results[0].total,
  });
};

// post hook will run after comment is created
commentSchema.post('save', function () {
  this.constructor.calcCommentQuantity(this.post);
});

//findOneAndUpdate
//findOneAndDelete
// if it start with findOneAnd
commentSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.model.findOne(this.getQuery());

  next();
});

commentSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcCommentQuantity(this.r.post);
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
