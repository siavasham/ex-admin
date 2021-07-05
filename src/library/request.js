import axios from "axios";
// import { setup } from "axios-cache-adapter";
export const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/"
    : "https://localhost:8000/";

// const axiosBase = setup({
//   axios,
//   baseURL: baseUrl + "api/manager/",
//   timeout: 5000,
//   validateStatus: function () {
//     return true;
//   },
//   cache: {
//     maxAge: 1000,
//   },
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// });
const axiosBase = axios.create({
  baseURL: baseUrl + "api/manager/",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export const get = async (path, opt) => {
  let header = {};
  try {
    if (opt?.cache) {
      header.cache = {
        maxAge: 10 * 60 * 1000,
      };
    }
    const res = await axiosBase.get(path, header);
    const { data } = await res;
    return data;
  } catch (error) {
    window.postMessage({ notify: ["error", "try-later"] }, "*");
    return await 0;
  }
};

export const post = async (path, items, opt) => {
  let header = {};
  try {
    if (opt?.cache) {
      header.cache = {
        maxAge: 10 * 60 * 1000,
      };
    }

    const res = axiosBase.post(path, new URLSearchParams(items).toString(), header);
    const { data } = await res;
    if (data?.login) {
      window.postMessage({ login: true }, "*");
    }
    return data;
    
  } catch (error) {
    window.postMessage({ notify: ["error", "try-later"] }, "*");
    return await 0;
  }
};

export default { get, post };
