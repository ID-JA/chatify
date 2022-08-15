import { useMutation } from "react-query";
import axios from "../config/axios";

const signup = async (user) => {
  return axios.post("/api/auth/signup", user);
};

export const useSignup = () => {
  return useMutation(signup);
};
