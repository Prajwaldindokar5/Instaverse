import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    likes: [],
    likesQuantity: {
      type: Number,
      default: 0,
    },

    commentsQuantity: {
      type: Number,
      default: 0,
    },

    caption: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'username name photo posts',
  }).populate({
    path: 'comments',
    populate: {
      path: 'user',
      select: 'username name photo ',
    },
  });
  next();
});

// postSchema.statics.calcTotalPosts = async function (userId) {
//   const results = await this.aggregate([
//     { $match: { user: userId } },
//     {
//       $group: {
//         _id: '$user',
//         total: { $sum: 1 },
//       },
//     },
//   ]);

//   console.log(results);
// };

// postSchema.post('save', function () {
//   this.constructor.calcTotalPosts(this.user);
// });

// //for findOneAndUpdate , findOneAndUpdate
// postSchema.pre(/^findOneAnd/, async function (next) {
//   this.p = await this.model.findOne(this.getQuery());
//   // console.log(this.p);
//   next();
// });

// postSchema.post(/^findOneAnd/, async function () {
//   await this.p.constructor.calcTotalPosts(this.p.user.id);
// });

const Post = mongoose.model('Post', postSchema);
export default Post;
