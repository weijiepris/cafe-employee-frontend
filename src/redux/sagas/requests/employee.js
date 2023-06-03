import axios from "axios";

export function requestGetEmployee() {
  return axios.request({
    method: "get",
    url: "http://backend:3001/employees",
  });
}
