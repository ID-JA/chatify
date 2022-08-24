import axiosInstance from "../axios";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`${endpoint}`);
      setData(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => getData, [endpoint]);

  return { data, isLoading, error };
};
