import axios from "axios";

export function requestGetCafe() {
  return axios.request({
    method: "get",
    url: "http://localhost:3001/cafes",
  });
}
