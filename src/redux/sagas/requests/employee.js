import axios from "axios";

export function requestGetEmployee() {
  axios
    .request({
      method: "get",
      url: "http://localhost:3001/",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return axios.request({
    method: "get",
    url: "http://localhost:3001/employees",
  });
}
