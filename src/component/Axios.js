import axios from "axios";
const instance = axios.create({ baseURL: "http://192.168.198.99:5000/api" });
// const instance = axios.create({ baseURL: "https://hkiepl.onrender.com/api" });
export default instance;


export const api = axios.create({
  baseURL: "http://192.168.198.99:5000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});


// export const api = axios.create({
//   baseURL: "https://hkiepl.onrender.com/api",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Allow-Origin": "*",
//   },
// });
