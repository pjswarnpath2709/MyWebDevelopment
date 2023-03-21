import { combineReducers } from "redux";
import Types from "../types/types";

const employeeReducer = (employees = [], action) => {
  switch (action.type) {
    case Types.GET_EMPLOYEES:
      return action.payload;
    default:
      return employees;
  }
};

const currentEmployeeReducer = (employee = null, action) => {
  switch (action.type) {
    case Types.GET_EMPLOYEE:
      return action.payload;
    default:
      return employee;
  }
};

const errorReducer = (error = null, action) => {
  switch (action.type) {
    case Types.ERROR:
      return action.payload;
    default:
      return error;
  }
};

export default combineReducers({
  employees: employeeReducer,
  currentEmployee: currentEmployeeReducer,
  error: errorReducer,
});
