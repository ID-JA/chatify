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
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 * send friend req
 * accept / reject friend req ( accept = add userID to friends array in db )
 */

const sendFriendReq = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const user = await User.findById(from);
    const friend = await User.findById(to);

    if (!user || !friend) {
      throw ApiError.NotFound("User not found");
    }

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

module.exports = { removeUser, getUserById, sendFriendReq };
