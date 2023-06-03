export const GET_EMPLOYEES = "GET_EMPLOYEES";
export const SET_EMPLOYEES = "SET_EMPLOYEES";

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
});

export const setEmployees = (employees) => ({
  type: SET_EMPLOYEES,
  employees,
});

const initialEmployeeState = {
  employees: [],
};

export default (state = initialEmployeeState, action) => {
  switch (action.type) {
    case SET_EMPLOYEES:
      const { employees } = action;
      return { ...state, employees };
    default:
      return state;
  }
};
