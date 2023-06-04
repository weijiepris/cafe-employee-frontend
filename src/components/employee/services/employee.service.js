import axios from "axios";

const EmployeeService = {};
EmployeeService.fetchEmployeesByCafeNameAndLocation = (
  nameParams,
  locationParams
) => {
  return axios.get(
    `http://localhost:3001/employees/cafe/${nameParams}/location/${locationParams}`
  );
};

EmployeeService.fetchAllEmployees = () => {
  return axios.get("http://localhost:3001/employees");
};

EmployeeService.fetchAllEmployeesByCafeName = (nameParams) => {
  return axios.get(`http://localhost:3001/employees/cafe/${nameParams}`);
};

EmployeeService.fetchAllEmployeesByCafeLocation = (locationParams) => {
  return axios.get(
    `http://localhost:3001/employees/location/${locationParams}`
  );
};

EmployeeService.createEmployee = (employeeObject) => {
  return axios.post(`http://localhost:3001/employees/`, employeeObject);
};

EmployeeService.updateEmployee = (employeeObject) => {
  console.log(employeeObject)
  return axios.put(`http://localhost:3001/employees/`, employeeObject);
};

EmployeeService.deleteEmployeeById = (id) => {
  return axios.delete(`http://localhost:3001/employees/${id}`);
};

export default EmployeeService;
