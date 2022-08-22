import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "Achraffawzi",
    email: "achraf.fawzi.a@gmail.com",
    picture: {
      publicID: "zdpxjybavwafdjtjqwqg",
      pictureURL:
        "https://res.cloudinary.com/dihdy1u2d/image/upload/v1660663533/users_pictures/zdpxjybavwafdjtjqwqg.jpg",
    },
    friends: [],
    reqSent: [],
    reqRecieved: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
