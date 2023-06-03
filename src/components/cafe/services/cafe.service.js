import axios from "axios";

const CafeService = {};

CafeService.createCafe = (formData) => {
  return axios.post(`http://backend:3001/cafes`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

CafeService.fetchCafe = () => {
  return axios.get("http://backend:3001/cafes");
};

CafeService.fetchCafeByCafeName = (name) => {
  return axios.get(`http://backend:3001/cafes/name/${name}`);
};

CafeService.fetchCafeByLocation = (location) => {
  console.log(location);
  return axios.get(`http://backend:3001/cafes/location/${location}`);
};

CafeService.updateCafe = (cafeObject) => {
  return axios.put("http://backend:3001/cafes", cafeObject);
};

CafeService.deleteCafeById = (id) => {
  return axios.delete(`http://backend:3001/cafes/${id}`);
};

export default CafeService;
