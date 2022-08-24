const User = require("../models/users.js");
const ApiError = require("../classes/ApiErrors.js");

const removeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete({ _id: id });
    // exports.redirect(`${process.env.CLIENT_URL}/`)
    res.status(200).json({ message: "User deleted" });
  } catch (e) {
    next(e);
  }
};

// get user by id
const getUser = async (req, res, next) => {
  try {
    console.log("first");
    const { userID, username } = req.query;
    const user = userID
      ? await User.findById(userID)
      : await User.findOne({ username: { $regex: username } });
    if (user) {
      const { password, updatedAt, isConfirmed, OTP, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.json(null);
    }
  } catch (err) {
    next(err);
  }
};

// get user by username

/**
 * send friend req
 * accept / reject friend req ( accept = add userID to friends array in db )
 */

const sendFriendReq = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    await User.findByIdAndUpdate(from, {
      $push: { reqSent: to },
    });

    await User.findByIdAndUpdate(to, {
      $push: { reqRecieved: from },
    });

    /**
     * todo: handle socket.io to send notification to "to" user
     */

    res.status(200).json({ message: "Friend request sent" });
  } catch (err) {
    next(err);
  }
};

const acceptFriendReq = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    await User.findByIdAndUpdate(from, {
      $pull: { reqRecieved: to },
    });

    await User.findByIdAndUpdate(to, {
      $pull: { reqSent: from },
    });

    await User.findByIdAndUpdate(from, {
      $push: { friends: to },
    });

    await User.findByIdAndUpdate(to, {
      $push: { friends: from },
    });

    /**
     * todo: handle socket.io to send notification to "to" user
     */

    res.status(200).json({ message: "friend request accepted" });
  } catch (err) {
    next(err);
  }
};

const refuseFriendReq = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    await User.findByIdAndUpdate(from, {
      $pull: { reqRecieved: to },
    });

    await User.findByIdAndUpdate(to, {
      $pull: { reqSent: from },
    });

    res.status(200).json({ message: "friend request refused" });
  } catch (err) {
    next(err);
  }
};

const removeFriend = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    await User.findByIdAndUpdate(from, {
      $pull: { friends: to },
    });

    await User.findByIdAndUpdate(to, {
      $pull: { friends: from },
    });

    res.status(200).json({ message: "friend removed" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  removeUser,
  getUser,
  sendFriendReq,
  acceptFriendReq,
  refuseFriendReq,
  removeFriend,
};
