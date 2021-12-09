import axios from "axios";


export default () => {

  if(window.sessionStorage.currentUser === null || window.sessionStorage.currentUser === undefined) {
    return axios.create({
      baseURL: 'http://hotelier.uz:3000/',
      withCredentials: true,
      validateStatus: function(status) {
        return status < 501;
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": true,
        'Content-Type': 'multipart/form-data'
      }
    })
  } else {
    const curUser = JSON.parse(window.sessionStorage.currentUser)

    return axios.create({
      baseURL: 'http://hotelier.uz:3000/',
      withCredentials: true,
      validateStatus: function(status) {
        return status < 501;
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": true,
        
        Authorization: curUser && curUser.token
      }
    })
  }
}


