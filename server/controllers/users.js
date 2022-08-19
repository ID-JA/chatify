const User = require("../models/users.js");

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

/**
 * get users of current user
 * get user
 * get sent users
 * get recieved users
 */

// const updateProfilePicture = async (req, res, next) => {
//     try {
//       //verify body
//       if (req.file === undefined) {
//         throw ApiError.BadRequest("Please insert a picture");
//       }
//       // get user
//       const user = await User.findByIdAndUpdate(req.params.id, {
//         picture: req.file.filename,
//       });
//       // delete old pic
//       fs.unlink(`./public/uploads/users/pictures/${user.picture}`, (err) => {
//         if (err) {
//           return res
//             .status(500)
//             .json(
//               createError.InternalServerError(
//                 "Something went wrong while trying to delete your old picture!"
//               )
//             );
//         }
//       });

//       res.json({ msg: "profile picture updated successfully" });
//     } catch (error) {
//       unlinkImage(`./public/uploads/users/pictures/${req.file.filename}`);
//       next(error);
//       return;
//     }
//   };

module.exports = { removeUser };
