import axios from "axios";

export function requestGetEmployee() {
  return axios.request({
    method: "get",
    url: "http://localhost:3001/employees",
  });
}
