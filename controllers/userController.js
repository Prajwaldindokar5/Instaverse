import asyncHandler from 'express-async-handler';
import AppError from '../utils/appError.js';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    users,
  });
});

export const getLoginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });
  if (!user) {
    return next(new AppError('User not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });
  if (!user) {
    return next(new AppError('User not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { name, username, photo, email, bio } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      username,
      photo,
      bio,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });

  if (!user) {
    return next(new AppError('Unable to find User', 404));
  }

  res.status(200).json({
    status: 'success',
    user,
  });
});

export const manageFollow = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const currentuser = await User.findById(req.user.id)
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });

  //check if currentUser is in user follower list
  const isFollower = user.followers.some((id) =>
    id._id.equals(currentuser._id)
  );

  // check if user is in current user following list
  const isFollowing = currentuser.following.some((id) =>
    id._id.equals(user._id)
  );

  if (!isFollower) {
    user.followers.push(currentuser._id);
    user.totalFollowers = user.followers.length;
    await user.save();
  }
  if (!isFollowing) {
    currentuser.following.push(user._id);
    currentuser.totalFollowing = currentuser.following.length;
    await currentuser.save();
  }

  res.status(200).json({
    status: 'success',
    currentuser,
  });
});

export const manageUnfollow = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const currentuser = await User.findById(req.user.id)
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });

  //check if currentUser is in user follower list
  const isFollower = user.followers.some((id) =>
    id._id.equals(currentuser._id)
  );

  // check if user is in current user following list
  const isFollowing = currentuser.following.some((id) =>
    id._id.equals(user._id)
  );

  if (isFollower) {
    const index = user.followers.findIndex((id) => id._id === currentuser._id);
    user.followers.splice(index, 1);
    user.totalFollowers = user.followers.length;
    await user.save();
  }
  if (isFollowing) {
    const index = currentuser.following.findIndex((id) => id._id === user._id);
    currentuser.following.splice(index, 1);
    currentuser.totalFollowing = currentuser.following.length;
    await currentuser.save();
  }

  res.status(200).json({
    status: 'success',
    currentuser,
  });
});

export const removeFollower = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const currentuser = await User.findById(req.user.id)
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    })
    .populate({
      path: 'stories',
    });

  //check if user is in currentuser follower list
  const isFollower = currentuser.followers.some((id) =>
    id._id.equals(user._id)
  );

  // check if currentuser is in  user following list
  const isFollowing = user.following.some((id) =>
    id._id.equals(currentuser._id)
  );

  const promises = [];

  if (isFollower) {
    const index = currentuser.followers.findIndex((id) =>
      id._id.equals(user._id)
    );
    console.log(index);
    currentuser.followers.splice(index, 1);
    currentuser.totalFollowers = currentuser.followers.length;
    promises.push(currentuser.save());
  }

  if (isFollowing) {
    const index = user.following.findIndex((id) =>
      id._id.equals(currentuser._id)
    );
    console.log(index);
    user.following.splice(index, 1);
    user.totalFollowing = user.following.length;
    promises.push(user.save());
  }

  await Promise.all(promises);

  res.status(200).json({
    status: 'success',
    currentuser,
    user,
  });
});

export const manageSave = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const user = await User.findById(req.user.id)
    .populate({
      path: 'posts',
    })
    .populate({
      path: 'followers following',
      select: 'username photo',
    });
  const post = await Post.findById(postId).select('content');

  const isPost = user.saved.some((save) => save._id.equals(post._id));
  const postIndex = user.saved.findIndex((save) => save._id.equals(post._id));

  if (!isPost) {
    user.saved.push(post);
    await user.save();
  } else {
    user.saved.splice(postIndex, 1);
    await user.save();
  }

  res.status(200).json({
    user,
  });
});
