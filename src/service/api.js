import axios from "axios";

export default () => {
  return axios.create({
    baseURL: 'http://195.158.30.34:1894/',
    withCredentials: true,
    timeout: 5000,
    validateStatus: function(status) {
      return status < 501;
    },
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


