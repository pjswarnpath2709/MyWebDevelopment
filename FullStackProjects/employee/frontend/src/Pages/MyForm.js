import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createEmployee } from "../actions";
import { useNavigate } from "react-router-dom";
import { validateEmployeeData } from "../helpers/employeeDataValidation";
import { defaults } from "../helpers/employeeDefaultData";

function MyForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nameValue, setNameValue] = useState(defaults.NAME);
  const [departmentValue, setDepartmentValue] = useState(defaults.DEPARTMENT);
  const [ageValue, setAgeValue] = useState(defaults.AGE);
  const [statusValue, setStatusValue] = useState(defaults.STATUS);
  const [addressValue, setAddressValue] = useState(defaults.ADDRESS);

  useEffect(() => {
    if (
      !validateEmployeeData({
        name: nameValue,
        department: departmentValue,
        status: statusValue,
        age: ageValue,
        address: addressValue,
      })
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [nameValue, departmentValue, ageValue, statusValue, addressValue]);

  const submitButtonHandler = (event) => {
    const createObject = {
      name: nameValue,
      address: addressValue,
      department: departmentValue,
      age: ageValue,
      status: statusValue,
    };
    if (validateEmployeeData(createObject)) {
      setAddressValue(defaults.ADDRESS);
      setAgeValue(defaults.AGE);
      setDepartmentValue(defaults.DEPARTMENT);
      setNameValue(defaults.NAME);
      setStatusValue(defaults.STATUS);
      dispatch(createEmployee(createObject));
      return navigate("/");
    } else {
      return;
    }
  };

  return (
    <div className="w-96 mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="department"
        >
          Department
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="department"
          type="text"
          value={departmentValue}
          onChange={(e) => setDepartmentValue(e.target.value)}
          placeholder="Enter your department"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
        >
          <option value="Full-Time">Full-Time</option>
          <option value="Contract Employee">Contract Employee</option>
          <option value="Remote Location">Remote Location</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="age">
          Age
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="age"
          type="number"
          value={ageValue}
          onChange={(e) => setAgeValue(e.target.value)}
          max={100}
          min={0}
          placeholder="Enter your age"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">
          Address
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          rows="5"
          value={addressValue}
          onChange={(e) => setAddressValue(e.target.value)}
          placeholder="Enter your address"
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={buttonDisabled}
          className={
            buttonDisabled
              ? "bg-blue-300 text-white font-thin py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          }
          type="button"
          onClick={submitButtonHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default MyForm;
