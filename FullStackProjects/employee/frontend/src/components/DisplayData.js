import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, updateEmployee } from "../actions";

const DisplayData = ({ drawerVisible }) => {
  const { _id, name, address, department, status, age } = useSelector(
    (state) => state.currentEmployee
  );
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);
  const [nameValue, setNameValue] = useState(name);
  const [departmentValue, setDepartmentValue] = useState(department);
  const [ageValue, setAgeValue] = useState(age);
  const [statusValue, setStatusValue] = useState(status);
  const [addressValue, setAddressValue] = useState(address);

  const editButtonHandler = (event) => {
    setDisabled(false);
  };

  const updateButtonHandler = (event) => {
    const updatedData = {
      name: nameValue === name ? null : nameValue,
      department: departmentValue === department ? null : departmentValue,
      status: statusValue === status ? null : statusValue,
      age: ageValue === age ? null : ageValue,
      address: addressValue === address ? null : addressValue,
    };
    dispatch(updateEmployee(_id, updatedData));
    setDisabled(true);
  };

  const deleteButtonHandler = (event) => {
    drawerVisible(false);
    dispatch(deleteEmployee(_id));
  };

  return (
    <div className="h-full w-full">
      <div className="mb-3 px-5 b flex gap-3">
        {disabled ? (
          <Button onClick={editButtonHandler}>Edit</Button>
        ) : (
          <Button onClick={updateButtonHandler}>Update</Button>
        )}

        <Button danger onClick={deleteButtonHandler}>
          Delete
        </Button>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          disabled={disabled}
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></input>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 font-bold mb-2">Department</label>
        <input
          value={departmentValue}
          disabled={disabled}
          onChange={(e) => setDepartmentValue(e.target.value)}
          type="text"
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></input>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 font-bold mb-2">Age</label>
        <input
          value={ageValue}
          onChange={(e) => setAgeValue(e.target.value)}
          disabled={disabled}
          type="number"
          max={100}
          min={0}
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></input>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 font-bold mb-2">Status</label>
        <select
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          disabled={disabled}
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          <option value="Contract Employee">Contract Employee</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Remote Location">Remote Location</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block text-gray-700 font-bold mb-2">Address</label>
        <textarea
          value={addressValue}
          onChange={(e) => setAddressValue(e.target.value)}
          rows="2"
          disabled={disabled}
          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        ></textarea>
      </div>
    </div>
  );
};

export default DisplayData;
