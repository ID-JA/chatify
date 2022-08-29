import axios from 'axios';

// export const cancelTokenSource = axios.CancelToken.source();

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  // cancelToken: cancelTokenSource.token,
});
