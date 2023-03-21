import settyl from "../api/settyl";
import Types from "../types/types";
import { validateEmployeeData } from "../helpers/employeeDataValidation";

// all the business logic will be handled in actions only

export const errorHandler = (error) => {
  console.error("\x1b[31m", " 👎👎👎 :", error);
  return {
    type: Types.ERROR,
    payload: error,
  };
};

export const fetchEmployees = () => async (dispatch) => {
  try {
    const {
      data: { employees, errorMessage },
    } = await settyl.get();
    if (!employees || errorMessage) {
      throw new Error(errorMessage);
    }
    dispatch(setEmployees(employees));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

export const fetchEmployee = (employeeId) => async (dispatch) => {
  try {
    const {
      data: { employee, errorMessage },
    } = await settyl.get(`/${employeeId}`);
    if (!employee || errorMessage) {
      throw new Error(errorMessage);
    }
    dispatch(setEmployee(employee));
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

export const updateEmployee =
  (
    employeeId,
    {
      name = null,
      address = null,
      department = null,
      status = null,
      age = null,
    }
  ) =>
  async (dispatch) => {
    try {
      const {
        data: { employee, errorMessage },
      } = await settyl.put(`/${employeeId}`, {
        name,
        address,
        department,
        status,
        age,
      });

      if (!employee || errorMessage) {
        throw new Error(errorMessage);
      }
      dispatch(setEmployee(employee));
      dispatch(fetchEmployees());
    } catch (err) {
      dispatch(errorHandler(err));
    }
  };

export const deleteEmployee = (employeeId) => async (dispatch, getState) => {
  try {
    const {
      data: { employee, errorMessage },
    } = await settyl.delete(`/${employeeId}`);
    if (!employee || errorMessage) {
      throw new Error(errorMessage);
    }
    dispatch(setEmployee(null));
    dispatch(fetchEmployees());
  } catch (err) {
    dispatch(errorHandler(err));
  }
};

export const createEmployee =
  ({ name, address, department, status, age }) =>
  async (dispatch) => {
    try {
      if (!validateEmployeeData({ name, address, department, status, age })) {
        throw new Error("validation failed! , fill form with appropriate data");
      }
      const {
        data: { employee, errorMessage },
      } = settyl.post("/create", { name, address, department, status, age });
      if (!employee || errorMessage) {
        throw new Error(errorMessage);
      }
      dispatch(fetchEmployees());
    } catch (err) {
      dispatch(errorHandler(err));
    }
  };

export const setEmployees = (employees) => {
  return { type: Types.GET_EMPLOYEES, payload: employees };
};

export const setEmployee = (employee) => {
  return { type: Types.GET_EMPLOYEE, payload: employee };
};
