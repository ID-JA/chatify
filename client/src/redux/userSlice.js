import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

const namespace = 'user';

export const signin = createAsyncThunk(`${namespace}/signin`, async (user, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.post('/api/auth/login', user);
    return data;
  } catch (error) {
    return typeof error.response.data === 'object'
      ? rejectWithValue({ message: error.response?.data?.message, color: 'yellow' })
      : rejectWithValue({ message: 'Incorrect email or password', color: 'red' });
  }
});

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: {
    [signin.fulfilled]: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.user = payload;
    },
  },
});

export default userSlice.reducer;
