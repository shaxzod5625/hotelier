import axios from "axios";

export default () => {
  return axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": true
    }
  });
}


