import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";

import Table from "../components/Table";
import MapComponent from "../components/MapComponent";
import DisplayData from "../components/DisplayData";

import { fetchEmployees, fetchEmployee, setEmployee } from "../actions";

const TableComponent = () => {
  const employees = useSelector((state) => state.employees);
  const currentEmployee = useSelector((state) => state.currentEmployee);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);
  return (
    <div className="p-5">
      <Table
        columns={["Name", "Age", "Department", "Address", "Status"]}
        rows={employees}
        handleClick={(employeeId) => {
          dispatch(fetchEmployee(employeeId));
          setVisible(true);
        }}
      />
      <Drawer
        open={visible}
        size={"large"}
        title={null}
        onClose={() => {
          dispatch(setEmployee(null));
          setVisible(false);
        }}
      >
        <div style={{ height: "450px" }}>
          {currentEmployee && <DisplayData drawerVisible={setVisible} />}
        </div>
        {currentEmployee && (
          <MapComponent address={currentEmployee.address}></MapComponent>
        )}
      </Drawer>
    </div>
  );
};

export default TableComponent;
