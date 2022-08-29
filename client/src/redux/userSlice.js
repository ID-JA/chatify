import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '62fbb6eb8c7d73173af33466',
    username: 'Achraffawzi',
    email: 'achraf.fawzi.a@gmail.com',
    picture: {
      publicID: 'zdpxjybavwafdjtjqwqg',
      pictureURL:
        'https://res.cloudinary.com/dihdy1u2d/image/upload/v1660663533/users_pictures/zdpxjybavwafdjtjqwqg.jpg',
    },
    friends: ['62fa765f67cc679a5dfb3c1e'],
    reqSent: [],
    reqRecieved: [],
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
