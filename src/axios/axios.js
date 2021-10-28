import axios from "axios";

const instance = axios.create({
  baseURL: "https://post-office-automation-api.herokuapp.com/api",
});

instance.interceptors.request.use(
  (req) => {
    const accessToken = window.localStorage.getItem("postOfficeAccessToken");

    req.headers = { Authorization: `Bearer ${accessToken}` };
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
