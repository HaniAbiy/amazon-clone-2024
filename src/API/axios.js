import axios from "axios";

const axiosInstance = axios.create({
    // base local instance firebase function
//   baseURL: "http://127.0.0.1:5001/clone-f872e/us-central1/api",
// deployed version of  render.com  base url
  baseURL: "https://amazon-clone-jntn.onrender.com/",
});

export {axiosInstance}
