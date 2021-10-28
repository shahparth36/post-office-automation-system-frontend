import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

instance.interceptors.request.use(
  (req) => {
    const accessToken = window.localStorage.getItem("postOfficeAccessToken");
    console.log(accessToken);
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
