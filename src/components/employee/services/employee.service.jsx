import axios from "axios";

export const fetchEmployeesByCafeNameAndLocation = (
  nameParams,
  locationParams
) => {
  return axios.get(
    `http://localhost:3001/employees/cafe/${nameParams}/location/${locationParams}`
  );
};

export const fetchAllEmployees = () => {
  return axios.get("http://localhost:3001/employees");
};

export const fetchAllEmployeesByCafeName = (nameParams) => {
  return axios.get(`http://localhost:3001/employees/cafe/${nameParams}`);
};

export const fetchAllEmployeesByCafeLocation = (locationParams) => {
  return axios.get(`http://localhost:3001/employees/location/${locationParams}`);
};
